/**
	confetti - component_description

	Usage: 'How to use component'

	Element => element_data_selector
	Options=>
		Option_name => Option_values //option_description
			- return_description_and_other_descriptions

	Example:
		Option_example
*/

;(function($, window, document, undefined){
	window.app.comps.confetti = {
		config: {
			confetti: {
				position: 'static',
				width: '100%',
				zIndex: '-1'
			}
		},
		init:function(){
			// Contains the initialization code
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			opts.$container = $('[' + self.attr_name('confetti') + ']').css({position: opts.position, 'z-index':opts.zIndex, 'width': opts.width});
			if(!opts.$container.length)return false;

			opts.canvas = opts.$container[0];
			opts.ctx = opts.canvas.getContext('2d');
			opts.confettiHandler;
			//canvas dimensions
			opts.W;
			opts.H;
			opts.mp = 150; //max particles
			opts.particles = [];

			opts.tiltChangeCountdown = 5;
			// angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
			opts.angle = 0;
			opts.tiltAngle = 0;

			// set canvas dimensions
			self.setCanvasDimensions();

			for(var i = 0; i < opts.mp; i++){
				opts.particles.push({
					x: Math.random() * opts.W, // x-coordinate
					y: Math.random() * opts.H, // y-coordinate
					r: self.randomFromTo(5, 30), // radius
					d: (Math.random() * opts.mp) + 10, // density
					color: 'rgba(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255) + ', .7)',
					tilt: Math.floor(Math.random() * 10) - 10,
					tiltAngleIncremental: (Math.random() * 0.07) + 0.05,
					tiltAngle: 0
				});
			}

			self.startConfetti();

			this.events();
		},
		events:function(){
			// Contains the event bindings and subscriptions
			var self = this,
					cf = this.config,
					opts = cf.confetti;


			$(window).off('resize.vc.confetti').on('resize.vc.confetti', function(){
				// canvas dimensions
				self.setCanvasDimensions();
			});
		},
		setCanvasDimensions:function(){
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			opts.W = $(document).width(); // window.innerWidth;
			opts.H = $(document).height(); // window.innerHeight;
			opts.canvas.width = opts.W;
			opts.canvas.height = opts.H;
		},
		randomFromTo:function(from, to) {
			return Math.floor(Math.random() * (to - from + 1) + from);
		},
		startConfetti:function(){
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			self.setCanvasDimensions();
			opts.confettiHandler = setInterval(self.draw.bind(self), 15);
		},
		stopConfetti:function(){
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			clearTimeout(opts.confettiHandler);
			if(!opts.ctx)return;
			opts.ctx.clearRect();
		},
		draw:function(){
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			// Clear canvas layer
			opts.ctx.clearRect(0, 0, opts.W, opts.H);
			for(var i = 0; i < opts.mp; i++){
				var p = opts.particles[i];
				opts.ctx.beginPath();
				opts.ctx.lineWidth = p.r / 2;
				opts.ctx.strokeStyle = p.color;
				opts.ctx.moveTo(p.x + p.tilt + (p.r / 4), p.y);
				opts.ctx.lineTo(p.x + p.tilt, p.y + p.tilt + (p.r / 4));
				opts.ctx.stroke(); // Draw it
			}
			self.update();
		},
		update:function(){
			var self = this,
					cf = this.config,
					opts = cf.confetti;

			opts.angle += 0.01;
			opts.tiltAngle += 0.1;
			opts.tiltChangeCountdown--;

			for(var i = 0; i < opts.mp; i++){
				var p = opts.particles[i];
				p.tiltAngle += p.tiltAngleIncremental;

				// Updating X and Y coordinates
				// We add 1 to the cos function to prevent negative values which would make flakes move upwards
				// Every particle has its own density making their downward movements different
				// We add radius to make it more random
				p.y += (Math.cos(opts.angle + p.d) + 1 + p.r / 2) / 2;
				p.x += Math.sin(opts.angle);
				p.tilt = (Math.sin(p.tiltAngle - (i / 3))) * 15;

				// Send flakes back to the top when it exits
				// We also make flakes enter from left and right also
				if(p.x > opts.W + 5 || p.x < -5 || p.y > opts.H){
					if(i % 5 > 0 || i % 2 === 0){
						// 66.67% of the flakes
						opts.particles[i] = {
							x: Math.random() * opts.W,
							y: -10,
							r: p.r,
							d: p.d,
							color: p.color,
							tilt: Math.floor(Math.random() * 10) - 10,
							tiltAngle: p.tiltAngle,
							tiltAngleIncremental: p.tiltAngleIncremental
						};
					}
					else{
						if(Math.sin(opts.angle) > 0){
							// Flake is exiting from the right, enter from the left
							opts.particles[i] = {
								x: -5,
								y: Math.random() * opts.H,
								r: p.r,
								d: p.d,
								color: p.color,
								tilt: Math.floor(Math.random() * 10) - 10,
								tiltAngle: p.tiltAngle,
								tiltAngleIncremental: p.tiltAngleIncremental
							};
						}
						else{
							// enter from the right
							opts.particles[i] = {
								x: opts.W + 5,
								y: Math.random() * opts.H,
								r: p.r,
								d: p.d,
								color: p.color,
								tilt: Math.floor(Math.random() * 10) - 10,
								tiltAngle: p.tiltAngle,
								tiltAngleIncremental: p.tiltAngleIncremental
							};
						}
					}
				}
			}
		}
	};
}(jQuery, window, document));
