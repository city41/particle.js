(function() {
	this.pjs = this.pjs || {};

	pjs.Emitter = function(config) {
		_.extend(this, config);

		this._particlePool = [];

		for (var i = 0; i < this.totalParticles; ++i) {
			this._particlePool.push(new pjs.Particle());
		}

		this._elapsed = 0;
		this._emitCounter = 0;
		this._particleIndex = 0;
		this._particleCount = 0;
		this.active = this.active || false;

		this.startColorVar = this.startColorVar || [0,0,0,0];
		this.endColorVar = this.endColorVar || [0,0,0,0];
	};

	pjs.Emitter.prototype = {
		_initParticle: function(particle) {
			particle.pos.x = this.posVar.x * pjs.random11();
			particle.pos.y = this.posVar.y * pjs.random11();

			var angle = this.angle + this.angleVar * pjs.random11();
			var speed = this.speed + this.speedVar * pjs.random11();
			particle.setVelocity(angle, speed);

			particle.radialAccel = this.radialAccel + this.radialAccelVar * pjs.random11() || 0;
			particle.tangentialAccel = this.tangentialAccel + this.tangentialAccelVar * pjs.random11() || 0;

			var life = this.life + this.lifeVar * pjs.random11() || 0;
			particle.life = Math.max(0, life);

			particle.scale = _.isNumber(this.startScale) ? this.startScale: 1;
			particle.deltaScale = _.isNumber(this.endScale) ? (this.endScale - this.startScale) : 0;
			particle.deltaScale /= particle.life;

			particle.radius = _.isNumber(this.radius) ? this.radius + (this.radiusVar || 0) * pjs.random11() : 0;

			// color
			if (this.startColor) {
				var startColor = [
					this.startColor[0] + this.startColorVar[0] * pjs.random11(),
					this.startColor[1] + this.startColorVar[1] * pjs.random11(),
					this.startColor[2] + this.startColorVar[2] * pjs.random11(),
					this.startColor[3] + this.startColorVar[3] * pjs.random11()
				];

				var endColor = startColor;
				if(this.endColor) {
					endColor = [
						this.endColor[0] + this.endColorVar[0] * pjs.random11(),
						this.endColor[1] + this.endColorVar[1] * pjs.random11(),
						this.endColor[2] + this.endColorVar[2] * pjs.random11(),
						this.endColor[3] + this.endColorVar[3] * pjs.random11()
					];
				}

				particle.color = startColor;
				particle.deltaColor = [
					(endColor[0] - startColor[0]) / particle.life, 
					(endColor[1] - startColor[1]) / particle.life, 
					(endColor[2] - startColor[2]) / particle.life, 
					(endColor[3] - startColor[3]) / particle.life
				];
			}
		}
	};

})();

