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

		this.startColorVar = this.startColorVar || [0, 0, 0, 0];
		this.endColorVar = this.endColorVar || [0, 0, 0, 0];
	};

	pjs.Emitter.prototype = {
		_isFull: function() {
			return this._particleCount === this.totalParticles;
		},

		_reset: function() {
			this._particleCount = 0;
			this._particleIndex = 0;
		},

		_addParticle: function() {
			if (this._isFull()) {
				return false;
			}

			var p = this._particlePool[this._particleCount];
			this._initParticle(p);
			++this._particleCount;

			return true;
		},

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
				if (this.endColor) {
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
		},

		_updateParticle: function(p, delta, i) {
			if (p.life > 0) {
				p.tmp = p.tmp || {
					x: 0,
					y: 0
				};
				p.tmp.x = 0;
				p.tmp.y = 0;

				p.radial = p.radial || {
					x: 0,
					y: 0
				};
				p.radial.x = 0;
				p.radial.y = 0;

				if (p.pos.x !== this.pos.x || p.pos.y !== this.pos.y) {
					var radialP = new Vector(p.rx, p.ry).normalize();
					p.radial.x = radialP.x;
					p.radial.y = radialP.y;
				}

				var tangential = _.clone(p.radial);

				p.radial.x *= p.radialAccel;
				p.radial.y *= p.radialAccel;

				var newy = tangential.x;
				tangential.x = -tangential.y;
				tangential.y = newy;
				tangential.x *= p.tangentialAccel;
				tangential.y *= p.tangentialAccel;

				p.tmp.x = p.radial.x + tangential.x + this.gravity.x;
				p.tmp.y = p.radial.y + tangential.y + this.gravity.y;

				p.tmp.x *= delta;
				p.tmp.y *= delta;

				p.vel.x += p.tmp.x;
				p.vel.y += p.tmp.y;

				p.tmp.x = p.vel.x * delta;
				p.tmp.y = p.vel.y * delta;

				p.rx += p.tmp.x;
				p.ry += p.tmp.y;

				p.pos.x = p.rx;
				p.pos.y = p.ry;

				p.life -= delta;

				p.scale += p.deltaScale * delta;

				if (p.color) {
					p.color[0] += p.deltaColor[0] * delta;
					p.color[1] += p.deltaColor[1] * delta;
					p.color[2] += p.deltaColor[2] * delta;
					p.color[3] += p.deltaColor[3] * delta;
				}

				++this._particleIndex;
			} else {
				var temp = this._particlePool[i];
				this._particlePool[i] = this._particlePool[this._particleCount - 1];
				this._particlePool[this._particleCount - 1] = temp;

				--this._particleCount;
			}
		},

		update: function(delta) {
			if (!this.active) {
				return;
			}

			if (this.emissionRate) {
				var rate = 1.0 / this.emissionRate;
				this._emitCounter += delta;

				while (!this._isFull() && this._emitCounter > rate) {
					this._addParticle();
					this._emitCounter -= rate;
				}
			}

			this._elapsed += delta;
			this.active = this._elapsed < this.duration;

			this._particleIndex = 0;

			while (this._particleIndex < this._particleCount) {
				var p = this._particlePool[this._particleIndex];
				this._updateParticle(p, delta, this._particleIndex);
			}
		}
	};

})();

