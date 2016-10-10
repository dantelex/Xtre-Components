/* global app */

/**
 * @file Xtre Framework
 * @author Dante Lex
 * @version 1.0
 */
/*

===============================================================================
=============================== Xtre FRAMEWORK =================================
===============================================================================
 */
;(function($){

	/**
	 * Creates a new Xtre exception
	 * @class
	 * @global
	 */
	var XtreException = function(message){
		this.name = "XtreException";
		this.message = message || "An error has occurred.";
	};
	XtreException.prototype = Object.create(Error.prototype);
	XtreException.prototype.constructor = XtreException;

	/**
	 * A component in the framework
	 * @typedef Component
	 */

	/**
	 * The main application object
	 * @namespace
	 * @global
	 */
	window.app = {
		/**
		 * The object containing the configuration options
		 */
		config:{
			dataNamespace: 'data-xt',
			alertContainerClass: 'alerts',
			alertTimeOut: 7000,
			scriptURLs: {}
		},

		/**
		 * Channels for the pubsub system
		 * @private
		 */
		channels: {},
		/**
		 * References the `this` object
		 * @readonly
		 */
		scope:this,

		/**
		 * Contains the various components of the application
		 * @private
		 */
		comps:{},

		/**
		 * Contains the utility functions
		 * @private
		 */
		utils:{

			/**
			 * Sends a notification to the user using the built-in notification system.
			 * @function app.notifyMe
			 * @param  {object|string} data An object containing the message and type
			 * @example
			 * app.notifyMe("Hello");
			 * app.notifyMe({
			 *		message: "You entered a wrong password.",
			 *		type: "error"
			 *	});
			 */
			notifyMe:function(data){
				// Used to notify the user
				/*
					data - an object containing the message and type
				*/
				var cf = this.config,
					self = this,
					container,
					tpl = '<div data-xt-role="alert" class="xt-alert alert-box"><p class="alert-content"></p><a href="#" class="close">&times;</a></div>';
				// console.log(arguments);
				var message = data.message || data,
					type = data.type || 'default' || 'success';

				if($('body').find('.' + cf.alertContainerClass).length > 0){
					container = $('.' + cf.alertContainerClass);
				}
				else{
					$('body').append($('<div>').addClass(cf.alertContainerClass));
					container = $('.' + cf.alertContainerClass);
				}

				var alertItem = {
					alertBox: {},
					alertTimer: {}
				};

				alertItem.alertBox = $(tpl).addClass(type);
				container.append(alertItem.alertBox);
				// console.log(this);
				alertItem.alertBox.find('.alert-content').html(message);
				self._log('Showing alert for message: ' + message);
				alertItem.alertBox.fadeIn();

				// alertItem.alertBox.height();
				// alertItem.alertBox.addClass('is-open');

				alertItem.alertTimer = setTimeout(function(){
					// console._log('hi');
					alertItem.alertBox.fadeOut(function(){
						$(this).remove();
					});
				}, cf.alertTimeOut);
				container.off('.alert').on('click.xt.alert','[' + self.attr_name('role') + '="alert"] a.close', function(e){
					e.preventDefault();
					$(this).closest('[' + self.attr_name('role') + '="alert"]').fadeOut(function(){
						$(this).remove();
					});
				});
				// console._log(container);
				// console._log(alertItem.alertBox);
				return this;
			},

			/**
			 * Creates a namespaced attribute name based on the specified string parameter. The namespace is specified as a global configuration option. The default namespace is `data-vc-`.
			 * @function app.attr_name
			 * @param  {string} str The string to create the attribute name from
			 * @example
			 * app.attr_name("option");
			 * // Returns the namespaced attribute name .i.e. data-vc-option
			 */
			attr_name:function(str){
				// Used to generate application-specific data- attributes
				// e.g. data-xt-role
				var cf = this.config;
				this._log('Attribute for: ' + str);
				return cf.dataNamespace + '-' + str;
			},

			/**
			 * Converts a semicolon-seperated string into its described object
			 * @function app.data_options
			 * @param {string} options The string to be formatted into the object
			 * @returns {object} The object parsed from the `options` string
			 */
			data_options:function(options){
				var opts = {};
				// Idea from Foundation.js by Zurb
				if (typeof options === 'object') {
					return options;
				}

				var opts_arr = (options || '=').split(';'),
				ii = opts_arr.length;

				function isNumber (o) {
					return ! isNaN (o-0) && o !== null && o !== "" && o !== false && o !== true;
				}

				// Polyfill for trim function in IE8 down

					// var trim = function () {
					//   return this.replace(/^\s+|\s+$/g, '');
					// }

				function trim(str) {
					if (typeof str === 'string') return str.replace(/^\s+|\s+$/g, '');
					// return str;
				}

				while (ii--) {
					var p = opts_arr[ii].split('=');

					if (/true/i.test(p[1])) p[1] = true;
					if (/false/i.test(p[1])) p[1] = false;
					if (isNumber(p[1])) p[1] = parseInt(p[1], 10);

					if (p.length === 2 && p[0].length > 0) {
						opts[trim(p[0])] = trim(p[1]);
					}
				}

				return opts;
			},
			/**
			 * Installs a script file that is required by downloading it and executing its content. It checks to make sure the script is correctly installed by checking the value returned from the test function, and then it executes the callback function. If no test function or value is passed, it installs the script and then executes the callback.
			 * @function app.require
			 * @param  {string} script Specifies the key used to store the URL of the script in the `config.scriptURLs` object.
			 * @param  {function} test   Returns `true` if the script is installed successfully.
			 * @param  {function} func   Executed after successfully installing script.
			 * @example
			 * app.require('skrollr', function(){
			 * 	return typeof skrollr !== "undefined";
			 * }), function(){
			 * 		console._log("Successfully installed skrollr");
			 * 		skrollr.init();
			 * });
			 */
			require:function(script, test, func){
				// Used to install required scripts
				/*
					script: The name of the script to include
					test:  Test to run before installing
					func: Function to run after installing

					Pseudo:
						- `script` is required
						- check for script by running `test` function
						- if available then run `func` - the callback function
						- else install `script`
						- after installing, check if available again by running `test` function
						- if available then run `func`
						- else do nothing. Script URL or test function is wrong
				*/
				var self = this,
					cf = this.config,
					scriptURLs = cf.scriptURLs,
					testExists = true;
				/*
					One option: to be considered later
				var getScriptURL = function () {
					var scripts = document.getElementsByTagName('script');
					var index = scripts.length - 1;
					return scripts[index].src;
				}
				var getAssetsPath = function () {
					return getScriptURL().replace(/js\/.+\.js$/, '')
				}
				var installExternalScript = function (url) {
					document.write('<script type="text/javascript" src="' + url + '"></' + 'script>');
				}
				var installThirdPartyScript = function (fileName) {
					var assetsPath = getAssetsPath();
					var thirdPartyPath = assetsPath + 'js/thirdparty/';
					installExternalScript(thirdPartyPath + fileName);
				}
				*/

				var getScript = function(url, callback, cache){
					return jQuery.ajax({
						url: url,
						type: "GET",
						dataType: "script",
						success: callback,
						cache: cache || true
					});//.done(callback);
				};

				// func = func || test || function(){};
				// test =
				if(typeof func === "undefined"){
					if(typeof test == "undefined"){
						func = function(){};
						test = true;
					}
					else{
						func = test;
						test = true;
					}
					testExists = false;
				}

				if(test() && testExists){
					// run func
					self._log('Require script already exists: ' + script);
					self._log('Calling require callback for: ' + script);
					func();
					return true;
				}
				else{
					// install script
					self._log('Require script not found: ' + script);
					self._log('Get require script: ' + script);
					getScript(scriptURLs[script], function(){
						self._log('Require script gotten: ' + script);
						self._log('Require script URL: ' + scriptURLs[script]);
						if(test()){
							self._log('Require script test passed: ' + script);
							self._log('Calling require callback for: ' + script);
							func();
							return true;
						}
						self._log('Require script test not passed: ' + script);
					});
				}
				return this;
			},

			/**
			 * A simple function to render a template with the passed data. The render function is adopted from the [Nano templating engine by Trix](https://github.com/trix/nano).
			 * @function app.render
			 * @param  {string} template String containing the template to be used
			 * @param  {object} data     Object containing the data to be used in rendering the template
			 * @return {string}          The rendered string
			 */
			render:function(template, data){
				/* Nano Templates (Tomasz Mazur, Jacek Becela) */
				return template.replace(/\{([\w\.]*)\}/g, function(str, key) {
					var keys = key.split("."), v = data[keys.shift()];
					for (var i = 0, l = keys.length; i < l; i++) v = v[keys[i]];
					return (typeof v !== "undefined" && v !== null) ? v : "";
				});
			},

			throttle:function(func, delay) {
				// Description:
				//    Executes a function a max of once every n milliseconds
				//
				// Arguments:
				//    Func (Function): Function to be throttled.
				//
				//    Delay (Integer): Function execution threshold in milliseconds.
				////
				// Returns:
				//    Lazy_function (Function): Function with throttling applied.
				var timer = null;

				return function () {
					var context = this, args = arguments;

					clearTimeout(timer);
					timer = setTimeout(function () {
						func.apply(context, args);
					}, delay);
				};
			},
			debounce:function(func, delay, immediate) {
				// Description:
				//    Executes a function when it stops being invoked for n seconds
				//    Modified version of _.debounce() http://underscorejs.org
				//
				// Arguments:
				//    Func (Function): Function to be debounced.
				//
				//    Delay (Integer): Function execution threshold in milliseconds.
				//
				//    Immediate (Bool): Whether the function should be called at the beginning
				//    of the delay instead of the end. Default is false.
				//
				// Returns:
				//    Lazy_function (Function): Function with debouncing applied.
				var timeout, result;
				return function() {
					var context = this, args = arguments;
					var later = function() {
						timeout = null;
						if (!immediate) result = func.apply(context, args);
					};
					var callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, delay);
					if (callNow) result = func.apply(context, args);
					return result;
				};
			},

			// PUBSUB SYSTEM
			// =============

			/**
			 * Publishes data to a specified channel, passing data to subscribers to the channel
			 * @function app.publish
			 * @param {string} channel Specifies the channel to publish to
			 * @param {object} data Specifies the data to be pushed to the subscribers
			 */
			publish:function(channel, data){
				// If the channel doesn't exist, just return. (It simply means there are no listeners)
				if(!this.channels.hasOwnProperty(channel)) return;
				data = data || {};

				// PATCH: For backward compatibility with old pubsub, add channel meta
				var e = {
					_channel: channel
				};
				e = $.extend({}, e, data);
				// data.serverid = _self.uuid;
				var lenListeners = this.channels[channel].length;
				for(var i = 0; i < lenListeners; i++){
					// Execute each listener
					// PATCH: For backward compatibility with old pubsub, add channel meta
					this.channels[channel][i] && this.channels[channel][i](e, data); // jshint ignore:line
					this._log('Listener called on: ' + channel);
				}
				this._log('Published to: ' + channel);
				return this;
			},
			/**
			 * @callback subscribeCallback
			 * @param {object} e Contains the publication event properties
			 * @param {object} data The data published to the channel
			 */

			/**
			 * Subscribes to a specified channel to receive data published into it
			 * @function app.subscribe
			 * @param {string} channel Specifies the channel to subscribe to
			 * @param {subscribeCallback} fn The callback function called when there is a publication
			 */
			subscribe:function(channel, fn){
				var _ = this;
				// If the channel doesn't exist, create the object
				if(!this.channels.hasOwnProperty(channel)) this.channels[channel] = [];

				// Add the listener to the queue
				var index = this.channels[channel].push(fn) - 1;
				this._log('Subscribed to: ' + channel);
				return {
					remove:function(){
						// delete this.channels[channel][index];
						_.channels[channel].splice(index, 1);
					}
				};
			},
			/**
			 * Unsubscribes from a specific channel
			 * @param {string} channel The channel to unsubscribe from
			 */
			unsubscribe:function(channel){
				delete this.channels[channel];
				this._log('Unsubscribed from: ' + channel);
			},

			// PUBSUB HELPER FUNCTIONS
			// =======================

			/**
			 * request for requesting for data from another component
			 * @function app.request
			 * @param  {string}   channel [name of channel]
			 * @param  {object}   [opts]    [Optional. data to be sent to replier]
			 * @param  {Function} fn      [callback function after request is responded to]
			 * @return {obj}           this
			 */
			request:function(channel, opts, fn){
				if(!fn){
					fn = opts;
					opts = {};
				}
				this.subscribe('reply:' + channel, fn);
				this.publish('request:' + channel, opts);
			},
			/**
			 * reply for replying to a request made to a channel
			 * @function app.reply
			 * @param  {string} channel [name of channel]
			 * @param  {function} data    [data or function that returns data to be passed to the requester]
			 * @return {obj}         this
			 */
			reply:function(channel, data){
				var self = this;

				this.subscribe('request:' + channel, function(e, opts){
					// If function was passed, use the returned value as data instead
					if(typeof data === 'function'){
						data = data(opts);
					}
					self.publish('reply:' + channel, data);
					// self.unsubscribe('reply:' + channel); //REMOVE: This should be done by the requester if he wants to
				});
				return this;
			},

			// DEBUG HELPER
			// ============
			/**
			 * Mainly used for development purposes. Logs data to the console in the development environment. Doesn't do anything in production environment. It should be used in replacement of console.log which cannot be controlled (since it is a native function).
			 * @function app.log
			 * @param {...String} message The message to log
			 *
			 */
			log:function(){
				if(this.config.env == 'development'){
					var args = [].slice.call(arguments, 0),
							suffix = Error().lineNumber ? 'line: '  + Error().lineNumber : '::XTRE::'; // + Error().stack;
					// console.trace();
					console.log.apply(console, args.concat([suffix]));
				}
			},
			_log:function(msg){
				this.log('%c' + msg, 'color:green;font-weight:bold;background:#fafafa;padding:5px;');
			}
		},

		/**
		 * @private
		 */
		debug:{
			noOfComps: 0,
			noOfCompErrors: 0
		},

		/**
		 * The initialization function called to initialize the framework
		 * @param {string} [comp] The name of the component to initialize
		 * @param {object} [config] The configuration options passed for initialization
		 * @returns {object} The this object
		 * @since 1.0
		 */
		init:function(comp, config){
			var self = this,
				cf = this.config;

			if(typeof comp == 'object'){
				config = comp;
				comp = undefined;
			}

			// Set the config options
			$.extend(true, this.config, config || {});

			if(!this.initialized){
				// Provide utility functions in application
				$.extend(this, this.utils);

				// Set the behavior of the elements in the app
				// app.initRoles();

				// Subscriptions
				this.subscribe('xt:notify', function(e, data){
					self.notifyMe(data);
				});
				this.subscribe('xt:init', function(e, data){
					self.init(data);
				});

				this.transitionEnd = this.transitionEndSelect();
				this.animationEnd = this.animationEndSelect();

				// Idea from Foundation by Zurb
				for(comp in this.comps){
					if(this.comps.hasOwnProperty(comp)){
						this.debug.noOfComps++;
						this.init_comp(comp);
						this.log('Xtre: ' + comp + ' initialized.');
					}
				}
				// DEBUG:
				if(this.config.env == 'development'){
					var _debugMessage = 'Total number of components: ' + this.debug.noOfComps +
							', Number of Errors: ' + this.debug.noOfCompErrors +
							', Number of initialized components: ' + (this.debug.noOfComps - this.debug.noOfCompErrors);
					var _debugMessageType = (this.debug.noOfCompErrors)? 'error':'info';

					this.notifyMe({message: _debugMessage, type: _debugMessageType});
				}
			}

			if(comp)this.init_comp(comp);

			if(cf.isOperamini){
				$.fn.fadeIn = $.fn.show;
				$.fn.fadeOut = $.fn.hide;
			}

			this.initialized = true;
			return this;
		},

		/**
		 * Calls the `init` function for `comp`
		 * @param {string} comp The name of the component to initialize
		 */
		init_comp:function(comp){
			this.patch(this.comps[comp], comp);
			try{
				// TODO: Don't initialize component if the container or wrapper doesn't exist on the page.
				return this.comps[comp].init.apply(this.comps[comp], []);
			}
			catch(e){
				var errorMessage = '"' + comp + '" component has a bug. Error: ' + e.message;
				console.error(errorMessage, e.stack);
				// DEBUG:
				this.debug.noOfCompErrors++;
				if(this.config.env == 'development'){
					this.notifyMe({message: errorMessage, type: 'error'});
				}
			}
		},
		patch:function(comp, compName){
			var tmpObj = {};
			tmpObj[compName] = {};
			// Patch component: Assign component variables
			comp.config = $.extend(true, tmpObj, comp.config, this.config);

			//Provide access to utilities within component to all components
			$.extend(this.utils, comp.utils);

			// Provide access to utilities within component to application
			$.extend(this, comp.utils);

			// Provide access to utility functions in component
			$.extend(comp, this.utils);
			comp.channels = this.channels;
			comp.transitionEnd = this.transitionEnd;
			comp.animationEnd = this.animationEnd;

			// Work on natively supporting event delegation in framework
			// comp.$el;
		},
		addUtility:function(utilName, utilFn){
			if(this.utils.hasOwnProperty(utilName)){
				throw new XtreException('utility name:' + utilName + ' is already is use.');
			}
			this.utils[utilName] = utilFn;
			this[utilName] = utilFn;
		},
		transitionEndSelect:function(){
			var el = document.createElement("div");
			if (el.style.WebkitTransition) return "webkitTransitionEnd";
			if (el.style.OTransition) return "oTransitionEnd";
			return 'transitionend';
		},
		animationEndSelect:function(){
			// var el = document.createElement("div");
			// if (el.style.WebkitAnimation) return "webkitAnimationEnd";
			// if (el.style.OAnimation) return "oAnimationEnd";
			// return 'animationend';
			return 'animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd';
		}
	};
})(jQuery);

/**
 * app.addUtility('utilname', function(){
 * 	console.log('Ginks.');
 * });
 *
 * app.init('select', {
 * 	dd:2
 * });
 *
 * clicky.log( href, title, type )
 * _kmq.push(['trackClick', 'ELEMENT_ID_OR_CLASS', 'EVENT_NAME']);
 */
