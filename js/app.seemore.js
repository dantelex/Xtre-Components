/**
	See More - component_description

	Usage: 'How to use component'

	Element => element_data_selector
	Options=>
		Option_name => Option_values //option_description
			- return_description_and_other_descriptions

	Example:
		Option_example
*/

;(function($, window, document, undefined){
	window.app.comps.seemore = {
		config: {
			seemore: {}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.seemore;

			opts.$container = $('[' + self.attr_name('seemore') + ']');
			opts.$itemSellAll = '.js-see-all';

			if(!opts.$container.length)return false;

			// Code begins here...

			opts.$container.each(function(index, elem){
				var $el = $(elem),
				seeMore = +$el.attr(self.attr_name('seemore')),
				myStr = $el.text();

				self.log(seeMore);
				if(myStr.length > seeMore){
					var newStr = myStr.substring(0, seeMore);
					var removedStr = myStr.substring(seeMore, myStr.length);
					$el.empty().text(newStr);
					$el.append('<a href="#" class="js-see-all see-all-link"><span class="see-all-dot">...</span> See all</a>');
					$el.append('<span class="more-text hide">' + removedStr + '</span>');
				}
			});

			this.events();
		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.seemore;

				opts.$container.off('click.xt.seemore', opts.$itemSellAll).on('click.xt.seemore', opts.$itemSellAll, function(e){
					e.preventDefault();
					self.log('clicked see all');

					var $el = $(this);
					$el.siblings('.more-text').fadeIn();
					$el.remove();
				});
		}
	};
}(jQuery, window, document));
