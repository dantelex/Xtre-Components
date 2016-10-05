/**
	Countdown Timer - component_description

	Usage: 'How to use component'

	Element => data-xt-countdowntimer

	Date 	- Days - Feb 29 2016 Days from current time
				- Hours & Minutes - Feb 29 2016 12:39 hours/Minutes from current time

	Options
		data-xt-endday, data-xt-endsec, data-xt-endHour, data-xt-endMinute
	Example:
		data-xt-endday = Feb 29 2016, data-xt-endday = Feb 29 2016 12:39  data-xt-endday =  Feb 29 2016 15:39 GMT+0100
		data-xt-endsec= 30
*/

;(function($, window, document, undefined){
	window.app.comps.countDownTimer = {
		config: {
			countDownTimer: {}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.countDownTimer,
					timesDay = {};

			opts.$container = $('[' + self.attr_name('countdowntimer') + ']');
			opts.days = '.js-days';
			opts.hours = '.js-hours';
			opts.minutes = '.js-minutes';
			opts.seconds = '.js-seconds';


			if(!opts.$container.length)return false;
			opts.$container.each(function(index, elem){
				var $el = $(elem), //the current element
						deadline, startMs, endMs, startDate, endDate, endTime,
						currentTime = Date.parse(new Date());

				timesDay.endSec = +$el.attr(self.attr_name('endsec'));
				timesDay.endDay = $el.attr(self.attr_name('endday'));
				timesDay.endHour = $el.attr(self.attr_name('endhour'));
				timesDay.endMinute = $el.attr(self.attr_name('endhour'));
				timesDay.schedule = $el.attr(self.attr_name('schedule'));

				if(timesDay.schedule) {

					// this will return an array with strings
					var temp = timesDay.schedule.split(",");
					var schedule = [temp];

					// iterate over each element in the schedule
					for(var i=0; i < schedule.length; i++){
							startDate = schedule[i][0];
							endDate = schedule[i][1];
					}

				}

				// put dates in milliseconds for easy comparisons
				endTime = Date.parse(timesDay.endDay);
				startMs = Date.parse(startDate);
				endMs = Date.parse(endDate);


				// Time in hours
				if(timesDay.endHour) {
					deadline = new Date(currentTime + (+timesDay.endHour) * 60 * 60 * 1000);
				}

				// Time in minutes
				if(timesDay.endMinutes) {
					deadline = new Date(currentTime + (+timesDay.endMinute) * 60 * 1000);
				}

				// Time in seconds
				if(timesDay.endSec) {
					deadline = new Date(currentTime + (+timesDay.endSec) * 1000);
				}

				// Time in days
				if(endTime > currentTime) {
					deadline = timesDay.endDay;
				}

				// if current date is between start and end dates, display clock
				if((endMs > currentTime) && (currentTime >= startMs)){
					deadline = endDate;
				}

				self.initializeClock($el, deadline);
			});


			this.events();

		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.countDownTimer;


		},

		getTimeRemaining:function(endtime){
			var self = this,
					cf = this.config,
					opts = cf.countDownTimer;

					if(endtime){
						var t = Date.parse(endtime) - Date.parse(new Date());
					  var seconds = Math.floor( (t/1000) % 60 );
					  var minutes = Math.floor( (t/1000/60) % 60 );
					  var hours = Math.floor( (t/(1000*60*60)) % 24 );
					  var days = Math.floor( t/(1000*60*60*24) );
					  return {
					    'total': t,
					    'days': days,
					    'hours': hours,
					    'minutes': minutes,
					    'seconds': seconds
					  };
					}
					else{
						return {
							'total': 0, 'days': 0, 'hours': 0, 'minutes': 0, 'seconds': 0
						};
					}

		},

		initializeClock:function($el, endtime){
			var self = this,
					cf = this.config,
					opts = cf.countDownTimer;


					// Only display when this function is called
					$el.removeClass('js-countdown-timer-none').addClass('js-countdown-timer-display');
					function updateClock(){
					  var t = self.getTimeRemaining(endtime);
						$el.find(opts.days).html(('0' + t.days).slice(-2));
			      $el.find(opts.hours).html(('0' + t.hours).slice(-2));
			      $el.find(opts.minutes).html(('0' + t.minutes).slice(-2));
			     	$el.find(opts.seconds).html(('0' + t.seconds).slice(-2));
					  if(t.total <= 0){
					    clearInterval(timeinterval);
							// opts.$container.html('these deals has expired');
					  }
					}

					updateClock(); // run function once at first to avoid delay
					var timeinterval = setInterval(updateClock, 1000);

		}


	};
}(jQuery, window, document));
