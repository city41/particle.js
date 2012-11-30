define([
	'particlesystem/Particle',
	'particlesystem/TextureLoader', 
	'particlesystem/PredefinedSystems',
	'particlesystem/util'
], 
function(Particle, TextureLoader, predefinedSystems, util) {
	/*
	 * Given a vector of any length, returns a vector
	 * pointing in the same direction but with a magnitude of 1
	 */
	function normalize(vector) {
		var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

		vector.x /= length;
		vector.y /= length;
	}

	var Emitter = function(system, defaultTexture) {
		this._defaultTexture = defaultTexture;

		if(!system || typeof system === 'string') {
			var predefinedSystem = predefinedSystems.getSystem(system);
			this._predefinedSystemName = predefinedSystem.name;
			system = predefinedSystem.system;
		} else {
			this._predefinedSystemName = '';
		}

		this._baseSystem = util.clone(system, ['texture']);
		this.reconfigure(system);
	};

	Emitter.prototype = {

		/*
		 * Applies all the properties in config to the particle system,
		 * a good way to change just one or two things about the system
		 * on the fly
		 */
		overlay: function(config) {
			util.extend(this, config);
			this.restart();
		},

		resetTexture: function() {
			this.overlay({
				texture: this._defaultTexture
			});
		},

		/*
		 * completely reconfigures the particle system. First applies all 
		 * the defaults, then overlays everything found in config
		 */
		reconfigure: function(config) {
			this._totalParticles = 0;
			this.emissionRate = 0;

			this.active = false;
			this.duration = 0;

			this.pos = this.pos || {};
			this.pos.x = 0;
			this.pos.y = 0;

			this.posVar = this.posVar || {};
			this.posVar.x = 0;
			this.posVar.y = 0;

			this.speed = 0;
			this.speedVar = 0;

			this.angle = 0;
			this.angleVar = 0;

			this.life = 0;
			this.lifeVar = 0;

			this.radius = 0;
			this.radiusVar = 0;

			this.texture = null;
			this.textureEnabled = false;
			this.textureAdditive = false;

			this.startScale = 0;
			this.startScaleVar = 0;
			this.endScale = 0;
			this.endScaleVar = 0;

			this.startColor = this.startColor || [];
			this.startColor[0] = 0;
			this.startColor[1] = 0;
			this.startColor[2] = 0;
			this.startColor[3] = 0;

			this.startColorVar = this.startColorVar || [];
			this.startColorVar[0] = 0;
			this.startColorVar[1] = 0;
			this.startColorVar[2] = 0;
			this.startColorVar[3] = 0;

			this.endColor = this.endColor || [];
			this.endColor[0] = 0;
			this.endColor[1] = 0;
			this.endColor[2] = 0;
			this.endColor[3] = 0;

			this.endColorVar = this.endColorVar || [];
			this.endColorVar[0] = 0;
			this.endColorVar[1] = 0;
			this.endColorVar[2] = 0;
			this.endColorVar[3] = 0;

			this.gravity = this.gravity || {};
			this.gravity.x = 0;
			this.gravity.y = 0;

			this.radialAccel = 0;
			this.radialAccelVar = 0;
			this.tangentialAccel = 0;
			this.tangentialAccelVar = 0;

			util.recursiveExtend(this, config, ['texture']);

			this.restart();
		},

		/*
		 * flushes out the particle pool and starts the system over
		 * from the beginning. Replacing all the particles with new ones
		 * is a bit nuclear, but gets the job done
		 */
		restart: function() {
			this._particlePool = [];

			for (var i = 0; i < this.totalParticles; ++i) {
				this._particlePool.push(new Particle());
			}

			this._particleCount = 0;
			this._particleIndex = 0;
			this._elapsed = 0;
			this._emitCounter = 0;
		},

		reset: function() {
			this.reconfigure(this._baseSystem);
		},

		/*
		 * Returns whether all the particles in the pool are currently active
		 */
		_isFull: function() {
			return this._particleCount === this.totalParticles;
		},

		/*
		 * Takes a dormant particle out of the pool and makes it active.
		 * Does nothing if there is no free particle availabe
		 */
		_addParticle: function() {
			if (this._isFull()) {
				return false;
			}

			var p = this._particlePool[this._particleCount];
			this._initParticle(p); ++this._particleCount;

			return true;
		},

		/*
		 * Initializes the particle based on the current settings
		 * of the particle system
		 */
		_initParticle: function(particle) {
			particle.texture = this.texture;
			particle.textureEnabled = this.textureEnabled;
			particle.textureAdditive = this.textureAdditive;

			particle.pos.x = this.pos.x + this.posVar.x * util.random11();
			particle.pos.y = this.pos.y + this.posVar.y * util.random11();

			var angle = this.angle + this.angleVar * util.random11();
			var speed = this.speed + this.speedVar * util.random11();

			// it's easier to set speed and angle at this level
			// but once the particle is active and being updated, it's easier
			// to use a vector to indicate speed and angle. So particle.setVelocity
			// converts the angle and speed values to a velocity vector
			particle.setVelocity(angle, speed);

			particle.radialAccel = this.radialAccel + this.radialAccelVar * util.random11() || 0;
			particle.tangentialAccel = this.tangentialAccel + this.tangentialAccelVar * util.random11() || 0;

			var life = this.life + this.lifeVar * util.random11() || 0;
			particle.life = Math.max(0, life);

			particle.scale = util.isNumber(this.startScale) ? this.startScale: 1;
			particle.deltaScale = util.isNumber(this.endScale) ? (this.endScale - this.startScale) : 0;
			particle.deltaScale /= particle.life;

			particle.radius = util.isNumber(this.radius) ? this.radius + (this.radiusVar || 0) * util.random11() : 0;

			// color
			// note that colors are stored as arrays => [r,g,b,a],
			// this makes it easier to tweak the color every frame in _updateParticle
			// The renderer will take this array and turn it into a css rgba string
			if (this.startColor) {
				var startColor = [
				this.startColor[0] + this.startColorVar[0] * util.random11(), this.startColor[1] + this.startColorVar[1] * util.random11(), this.startColor[2] + this.startColorVar[2] * util.random11(), this.startColor[3] + this.startColorVar[3] * util.random11()];

				// if there is no endColor, then the particle will end up staying at startColor the whole time
				var endColor = startColor;
				if (this.endColor) {
					endColor = [
					this.endColor[0] + this.endColorVar[0] * util.random11(), this.endColor[1] + this.endColorVar[1] * util.random11(), this.endColor[2] + this.endColorVar[2] * util.random11(), this.endColor[3] + this.endColorVar[3] * util.random11()];
				}

				particle.color = startColor;
				particle.deltaColor = [(endColor[0] - startColor[0]) / particle.life, (endColor[1] - startColor[1]) / particle.life, (endColor[2] - startColor[2]) / particle.life, (endColor[3] - startColor[3]) / particle.life];
			}
		},

		/*
		 * Updates a particle based on how much time has passed in delta
		 * Moves the particle using its velocity and all forces acting on it (gravity,
		 * radial and tangential acceleration), and updates all the properties of the
		 * particle like its size, color, etc
		 */
		_updateParticle: function(p, delta, i) {
			if (p.life > 0) {

				// these vectors are stored on the particle so we can reuse them, avoids
				// generating lots of unnecessary objects each frame
				p.forces = p.forces || {
					x: 0,
					y: 0
				};
				p.forces.x = 0;
				p.forces.y = 0;

				p.radial = p.radial || {
					x: 0,
					y: 0
				};
				p.radial.x = 0;
				p.radial.y = 0;

				// dont apply radial forces until moved away from the emitter
				if ((p.pos.x !== this.pos.x || p.pos.y !== this.pos.y) && (p.radialAccel || p.tangentialAccel)) {
					p.radial.x = p.pos.x - this.pos.x;
					p.radial.y = p.pos.y - this.pos.y;

					normalize(p.radial);
				}

				p.tangential = p.tangential || {
					x: 0,
					y: 0
				};
				p.tangential.x = p.radial.x;
				p.tangential.y = p.radial.y;

				p.radial.x *= p.radialAccel;
				p.radial.y *= p.radialAccel;

				var newy = p.tangential.x;
				p.tangential.x = - p.tangential.y;
				p.tangential.y = newy;

				p.tangential.x *= p.tangentialAccel;
				p.tangential.y *= p.tangentialAccel;

				p.forces.x = p.radial.x + p.tangential.x + this.gravity.x;
				p.forces.y = p.radial.y + p.tangential.y + this.gravity.y;

				p.forces.x *= delta;
				p.forces.y *= delta;

				p.vel.x += p.forces.x;
				p.vel.y += p.forces.y;

				p.pos.x += p.vel.x * delta;
				p.pos.y += p.vel.y * delta;

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
				// the particle has died, time to return it to the particle pool
				// take the particle at the current index
				var temp = this._particlePool[i];

				// and move it to the end of the active particles, keeping all alive particles pushed
				// up to the front of the pool
				this._particlePool[i] = this._particlePool[this._particleCount - 1];
				this._particlePool[this._particleCount - 1] = temp;

				// decrease the count to indicate that one less particle in the pool is active.
				--this._particleCount;
			}
		},

		update: function(delta) {
			this._elapsed += delta;
			this.active = this._elapsed < this.duration;

			if (!this.active) {
				return;
			}

			if (this.emissionRate) {
				// emit new particles based on how much time has passed and the emission rate
				var rate = 1.0 / this.emissionRate;
				this._emitCounter += delta;

				while (!this._isFull() && this._emitCounter > rate) {
					this._addParticle();
					this._emitCounter -= rate;
				}
			}

			this._particleIndex = 0;

			while (this._particleIndex < this._particleCount) {
				var p = this._particlePool[this._particleIndex];
				this._updateParticle(p, delta, this._particleIndex);
			}
		}
	};

	Object.defineProperty(Emitter.prototype, 'particles', {
		get: function() {
			return this._particlePool;
		}
	});

	Object.defineProperty(Emitter.prototype, 'totalParticles', {
		get: function() {
			return this._totalParticles;
		},
		set: function(tp) {
			tp = tp | 0;
			if(tp !== this._totalParticles) {
				this._totalParticles = tp;
				this.restart();
			}
		}
	});

	// TODO: this needs to die
	Object.defineProperty(Emitter.prototype, 'predefinedSystem', {
		get: function() {
			return this._predefinedSystemName;
		},
		set: function(ps) {
			if(this._predefinedSystemName !== ps) {
				this._predefinedSystemName = ps;
				this._baseSystem = predefinedSystems.getSystem(ps).system;
				this.reset();
			}
		}
	});

	Object.defineProperty(Emitter.prototype, 'textureFile', {
		get: function() {
			return (this._file && this._file.name) || '';
		},
		set: function(file) {
			try {
				TextureLoader.load(this, 'texture', file);
				this._file = file;
			} catch(e) {

			}
		}
	});

	return Emitter;
});

