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
	window.app.comps.socialShare = {
		config: {
			socialShare: {
				api: '699173753481084'
			}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.socialShare;

			opts.$container = $('[' + self.attr_name('social') + ']');
			if(!opts.$container.length)return false;

			// Code begins here...

			this.events();
		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.socialShare;

					opts.$container.off('click.vc.socialShare').on('click.vc.socialShare',function(e){
						e.preventDefault();

						self.share(this);

					});


		},
		share:function(el) {
			var self = this,
					cf = this.config,
					opts = cf.socialShare;

					var $el = $(el),
							urlLink = $el.attr(self.attr_name('social')),
							siteUrl = $el.attr(self.attr_name('surl')),
							siteRedirectUrl = $el.attr(self.attr_name('sredirecturl')),
							titleName = $el.attr(self.attr_name('stitle')),
							hashtags = $el.attr(self.attr_name('shashtags')),
							handle = $el.attr(self.attr_name('shandle')),
							summary = $el.attr(self.attr_name('ssummary')),
							image = $el.attr(self.attr_name('simage')),
							domain = $el.attr(self.attr_name('sdomain')),
							mini = !!$el.attr(self.attr_name('smini')),
							name = $el.attr(self.attr_name('sname')),
							// href = $el.attr('href'),
							link, nameQuery, titleQuery, siteRedirectUrlQuery, summaryQuery, imageQuery, hashtagsQuery, handleQuery, miniQuery, domainQuery, siteUrlQuery;


					if(urlLink == 'facebook') {

						// window.location = image;
							// https://www.facebook.com/dialog/feed?app_id=1389892087910588
							// &redirect_uri=https://scotch.io
							// &link=https://scotch.io
							// &picture=http://placekitten.com/500/500
							// &caption=This%20is%20the%20caption
							// &description=This%20is%20the%20description

						// link = 'https://www.facebook.com/sharer.php?u=' + siteUrl 1389892087910588;
						link = 'https://www.facebook.com/dialog/feed?app_id=' + opts.api;

						if(typeof siteUrl !== 'undefined'){
							siteUrlQuery = '&link=' + siteUrl;
							link += siteUrlQuery;
						}

						if(typeof name !== 'undefined'){
							nameQuery = '&name=' + name;
							link += nameQuery;
						}

						if(typeof siteRedirectUrl !== 'undefined'){
							siteRedirectUrlQuery = '&redirect_uri=' + siteUrl;
							link += siteRedirectUrlQuery;
						}

						if(typeof titleName !== 'undefined'){
							// titleQuery = '&p[title]=' + titleName;
							titleQuery = '&caption=' + titleName;
							link += titleQuery;
						}

						if(typeof summary !== 'undefined'){
							// summaryQuery = '&p[summary]=' + summary;
							summaryQuery = '&description=' + summary;
							link += summaryQuery;
						}

						if(typeof image !== 'undefined'){
							// imageQuery = '&p[images][0]=' + image;
							imageQuery = '&picture=' + image;
							link += imageQuery;
						}
					}

					else if(urlLink == 'twitter') {
						link = 'http://twitter.com/intent/tweet?url=' + siteUrl;

						if(typeof titleName !== 'undefined'){
							titleQuery = '&text=' + titleName;
							link += titleQuery;
						}

						if(typeof hashtags !== 'undefined'){
							hashtagsQuery = '&hashtags=' + hashtags;
							link += hashtagsQuery;
						}

						if(typeof handle !== 'undefined'){
							handleQuery = '&via=' + handle;
							link += handleQuery;
						}
						// link = 'http://twitter.com/intent/tweet?text=' + title + '&url=' + url + '&hashtags=' + hashtags + '&via=' + handle;
					}

					else if(urlLink == 'goopleplus') {
						link = 'https://plus.google.com/share?url=' + siteUrl;

						if(typeof titleName !== 'undefined'){
							titleQuery = '&t=' + titleName;
							link += titleQuery;
						}
					}

					else if(urlLink == 'linkedin') {
						// link = 'https://www.linkedin.com/cws/share?url=' + url + '&t=' + title;
						link = 'https://www.linkedin.com/shareArticle?url=' + siteUrl;

						if(typeof titleName !== 'undefined'){
							titleQuery = '&title=' + titleName;
							link += titleQuery;
						}

						if(typeof summary !== 'undefined'){
							summaryQuery = '&summary=' + summary;
							link += summaryQuery;
						}

						if(typeof mini !== 'undefined'){
							miniQuery = '&mini=' + mini;
							link += miniQuery;
						}

						if(typeof domain !== 'undefined'){
							domainQuery = '&source=' + domain;
							link += domainQuery;
						}

					}

					window.open(link, urlLink + '-share-dialog', 'width=626,height=436');


		}
	};
}(jQuery, window, document));
