/**
	Placeholder Avatar - Used for generating user initials and setting user image if neccessary

	Usage: 'How to use component'

	Element => 'data-vc-placeholder-avatar'

	Example:

*/

;(function($, window, document, undefined){
	window.app.comps.placeholderAvatar = {
		config: {
			placeholderAvatar: {
				useColorClasses: true,
				colorUrl: 'data/data.json',
				colorsArray: ["#FF2800", "#ff3e1a", "#00A0B2", "#00bed3", "#FFF500", "#fff61a", "#24A597", "#2abeae", "#DE0052", "#fb005d", "#7B07A9", "#9208c9", "#ff6d00", "#ff7c1a", "#9c0", "#b0eb00", "#00BF32", "#00df3a", "orange", "#ffae1a", "#FF4637", "#ff594b", "#4212AF", "#4d15cc"],
				colorsClass: 'color-0 color-1 color-2 color-3 color-4 color-5 color-6 color-7 color-8 color-9 color-10 color-11 color-12 color-13 color-14 color-15 color-16 color-17 color-18 color-19 color-20 color-21 color-22 color-23'
			}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.placeholderAvatar;


					opts.$container = $('[' + self.attr_name('placeholder-avatar') + ']');
					opts.$avatarSize = $('[' + self.attr_name('avatar-size') + ']');
					opts.$userImage = $('[' + self.attr_name('uimage') + ']');
					opts.$backgroundImage = $('[' + self.attr_name('background-uimage') + ']');
					opts.intitalsWrapper = '.js-user-initials-wrapper';
					opts.intitals = '.js-user-initials';

					$(opts.intitalsWrapper).remove();


					if(!opts.$container.length)return false;
					opts.$container.each(function(index, elem){
						var $el = $(elem), //The current element
						numColors = 24,
						colors;

						// Colors set
						if(opts.useColorClasses === false){
							colors = opts.colorsArray;
						}
						else {
							colors = opts.colorsClass;
						}

						placeholderAvatar = $el.attr(self.attr_name('placeholder-avatar')),
						userImage = $el.attr(self.attr_name('uimage')),
						backgroundImage = $el.attr(self.attr_name('background-uimage')),
						avatarSize = $el.attr(self.attr_name('avatar-size'));

						var initials = placeholderAvatar && self.getInitials(placeholderAvatar); // Get the initials

						// If the initials contains only numbers, then display no text
						if(!isNaN(initials))initials = '';

						var coloursIndex = Math.abs(self.hashCode(placeholderAvatar)) % numColors, //Get a random color from the color set
						initialsContent = '<div class="user-initials js-user-initials"></div>',
						$uInitialsContent;
						if(opts.useColorClasses === false){
							$uInitialsContent = $('<div class="user-initials-wrapper js-user-initials-wrapper">').html(initialsContent); //Create the html
						}
						else {
							$uInitialsContent = $('<div class="user-initials-wrapper js-user-initials-wrapper color-0">').html(initialsContent); //Create the html
						}

						if(placeholderAvatar) {
							$el.prepend($uInitialsContent);
							if(opts.useColorClasses === false){
								$el.find(opts.intitalsWrapper).css('background-color', colors[coloursIndex]); //Change the background-color
							}
							else {
							$el.find(opts.intitalsWrapper).removeClass(colors).addClass('color-' + coloursIndex); //Change the background-color
							}
							$el.find(opts.intitals).text(initials); //Show the initials
						}

						else if (placeholderAvatar === '' && (userImage === '' || backgroundImage === '')) {
							$el.prepend($uInitialsContent); //Add the html content
							if(opts.useColorClasses === false){
								$el.find(opts.intitalsWrapper).css('background-color', "#f2f6f7"); //Change the background-color
							}
							else {
								$el.find(opts.intitalsWrapper).removeClass(colors).addClass('color-g'); //Change the background-color
							}
							$el.find(opts.intitals).addClass('icon-user'); //Show the initials
						}

						else if (placeholderAvatar === '' && userImage) {
							$el.prepend($uInitialsContent); //Add the html content
							$el.find(opts.intitalsWrapper).removeClass(colors).addClass('pb-0').html(self.createImage(userImage)); //Add img tag with image
						}

						else if (placeholderAvatar === '' && backgroundImage) {
							$el.prepend($uInitialsContent); //Add the html content
							$el.find(opts.intitalsWrapper).removeClass(colors).addClass('pb-0, bimage').css('background-image', 'url(' + backgroundImage + ')'); //Add background image
						}

						else {
							$el.prepend($uInitialsContent); //Add the html content
							if(opts.useColorClasses === false){
								$el.find(opts.intitalsWrapper).css('background-color', "#f2f6f7");
							}
							else {
								$el.find(opts.intitalsWrapper).removeClass(colors).addClass('color-g'); //Change the background-color
							}

							$el.find(opts.intitals).addClass('icon-user'); //Show the initials
						}

						//Changes the font-size of the initials
						switch (avatarSize) {
							case "small":
									$el.find(opts.intitalsWrapper).addClass('avatar-small');
								break;
							case "medium":
									$el.find(opts.intitalsWrapper).addClass('avatar-medium');
								break;
							case "large":
									$el.find(opts.intitalsWrapper).addClass('avatar-large');
								break;

						}


					});



			this.events();

		},

		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.placeholderAvatar;


		},

		hashCode:function(msg) {
			var self = this,
					cf = this.config,
					opts = cf.placeholderAvatar;

					var hash = 0,
								i, chr, len;
					if (msg.length === 0) return hash;
					for (i = 0, len = msg.length; i < len; i++) {
								chr = msg.charCodeAt(i);
								hash = ((hash << 5) - hash) + chr;
								hash |= 0; // Convert to 32bit integer
					}
					return hash;
		},

		getInitials:function(msg, content) {
			var self = this,
					cf = this.config,
					opts = cf.placeholderAvatar;


					if (typeof content == "undefined") {
								content = true;
					}
					var initials = msg.replace(/[^0-9a-zA-Z- ]/g, "").match(/\b\w/g);
					if (content) {
								return initials.join('').substring(0, 2);
					}

					return initials.substring(0, 2);

		},

		createImage:function(image) {
			var self = this,
					cf = this.config,
					opts = cf.placeholderAvatar;

        var thumb = '<img src="' + image + '">';

        return thumb;
    },



	};
}(jQuery, window, document));
