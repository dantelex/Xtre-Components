/**
	exitintent - Manages the exit intent functionality

	Different approaches:
	- Leaving the window
	- Scroll down to 75% of the page
	- Been on the page for 3 minutes

	Usage: 'How to use component'

	Element => element_data_selector
	Options=>
		Option_name => Option_values //option_description
			- return_description_and_other_descriptions

	Example:
		Option_example
*/

;(function($, window, document, undefined){
	window.app.comps.exitintent = {
		config: {
			exitintent: {
				exitDelay: 300
			}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.exitintent;

			opts.$container = $('[' + self.attr_name('exitintent') + ']');
			if(!opts.$container.length)return false;


			this.events();
		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.exitintent;


			$('html').off('mouseleave.xt.exitintent').on('mouseleave.xt.exitintent', function(e){
				if(e.clientY <= 0){
					// self.log('leaving');
					// Give timeout for user to change his mind
					opts.exitTimeout = setTimeout(function(){
						opts.$container.find('.exitintent-wrapper').fadeIn();
					}, opts.exitDelay);
				}
			});

			$('html').off('mouseenter.xt.exitintent').on('mouseenter.xt.exitintent', function(e){
				// Clear timeout if user enters the page again within the timeout duration
				clearTimeout(opts.exitTimeout);
				opts.exitTimeout = null;
			});
		}
	};
}(jQuery, window, document));
