/**
	component_name - component_description

	Usage: 'How to use component'

	Element => element_data_selector
	Options=>
		Option_name => Option_values //option_description
			- return_description_and_other_descriptions

	Example:
		Option_example
*/

;(function($, window, document, undefined){
	window.app.comps.accordion = {
		config: {
			accordion: {}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.accordion;

			opts.$container = $('[' + self.attr_name('accordion') + ']');

			if(!opts.$container.length)return false;


			for (var i = 0; i < opts.$container.length; i++) {
					var $curEl = opts.$container[i];

					$curEl.onclick = function(){
					var $el = $(this);
					$el.toggleClass('active');
					$el.next().toggleClass('show');
				}
			}

			// Code begins here...

			this.events();
		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.accordion;
		}
	};
}(jQuery, window, document));
