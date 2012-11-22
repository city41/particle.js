define(['particlesystem/util'], function(util) {
	var Particle = function() {
		this.pos = {
			x: 0,
			y: 0
		};
		this.setVelocity(0, 0);
		this.life = 0;
	};

	Particle.prototype = {
		setVelocity: function(angle, speed) {
			this.vel = {
				x: Math.cos(util.toRad(angle)) * speed,
				y: -Math.sin(util.toRad(angle)) * speed
			};
		}
	};

	return Particle;
});


