(function() {
	this.pjs = this.pjs || {};

	pjs.Particle = function(x, y, angle, speed) {
		this.pos = {
			x: x,
			y: y
		};

		this.vel = {
			x: Math.cos(pjs.toRad(angle)) * speed,
			y: Math.sin(pjs.toRad(angle)) * speed
		};
	};

})();


