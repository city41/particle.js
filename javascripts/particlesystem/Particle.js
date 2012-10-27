(function() {
	this.pjs = this.pjs || {};

	pjs.Particle = function() {
		this.pos = {
			x: 0,
			y: 0
		};
		this.setVelocity(0, 0);
	};

	pjs.Particle.prototype = {
		setVelocity: function(angle, speed) {
			this.vel = {
				x: Math.cos(pjs.toRad(angle)) * speed,
				y: -Math.sin(pjs.toRad(angle)) * speed
			};
		}
	};

})();


