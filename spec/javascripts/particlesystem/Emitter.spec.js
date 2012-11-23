describe('Emitter', ['particlesystem/Emitter'], function(Emitter) {
	describe('construction', function() {
		it('should require a system', function() {
			var fn = function() {
				new Emitter();
			};

			expect(fn).toThrow();
		});

		it('should have defaulted all attributes', function() {
			var e = new Emitter({
				system: {}
			});

			expect(e._totalParticles).toBe(0);
			expect(e.emissionRate).toBe(0);
			expect(e.active).toBe(false);
			expect(e.duration).toBe(0);
			
			expect(e.pos.x).toBe(0);
			expect(e.pos.y).toBe(0);
			
			expect(e.posVar.x).toBe(0);
			expect(e.posVar.y).toBe(0);

			expect(e.angle).toBe(0);
			expect(e.angleVar).toBe(0);

			expect(e.speed).toBe(0);
			expect(e.speedVar).toBe(0);

			expect(e.life).toBe(0);
			expect(e.lifeVar).toBe(0);

			expect(e.radius).toBe(0);
			expect(e.radiusVar).toBe(0);

			expect(e.texture).toBe(null);
			expect(e.textureEnabled).toBe(false);
			expect(e.textureAdditive).toBe(false);

			expect(e.startScale).toBe(0);
			expect(e.startScaleVar).toBe(0);
			expect(e.endScale).toBe(0);
			expect(e.endScaleVar).toBe(0);

			expect(e.startColor).toEqual([0,0,0,0]);
			expect(e.startColorVar).toEqual([0,0,0,0]);
			expect(e.endColor).toEqual([0,0,0,0]);
			expect(e.endColorVar).toEqual([0,0,0,0]);

			expect(e.gravity).toEqual({ x: 0, y: 0 });

			expect(e.radialAccel).toBe(0);
			expect(e.radialAccelVar).toBe(0);
			expect(e.tangentialAccel).toBe(0);
			expect(e.tangentialAccelVar).toBe(0);
		});

		it('should apply the passed in system', function() {
			var xGravity = 1234;
			var yGravity = 4567;

			var e = new Emitter({
				system: {
					gravity: {
						x: xGravity,
						y: yGravity
					}
				}
			});

			expect(e.gravity.x).toBe(xGravity);
			expect(e.gravity.y).toBe(yGravity);
		});

		it('should apply arbitrary attributes', function() {
			var e = new Emitter({
				system: {
					notReallyAParticleSystemAttribute: 'hello'
				}
			});

			expect(e.notReallyAParticleSystemAttribute).toBe('hello');
		});
	});

	describe('updating particles', function() {
		var e;
		beforeEach(function() {
			e = new Emitter({
				system: {
					totalParticles: 1,
					emissionRate: 1
				}
			});
		});

		it('should have a particle', function() {
			expect(e.particles.length).toBe(1);
		});

		it('should not do anything if its not active', function() {
			e.overlay({
				life: 1,
				speed: 1,
				angle: 1,
				active: false,
				duration: 1
			});

			var particleOrigX = e.particles[0].pos.x;
			var particleOrigY = e.particles[0].pos.y;

			e.update(10);

			expect(e.particles[0].pos.x).toEqual(particleOrigX);
			expect(e.particles[0].pos.y).toEqual(particleOrigY);
		});

		it('should not update anything if its duration is zero', function() {
			e.overlay({
				life: 1,
				speed: 1,
				angle: 1,
				active: true,
				duration: 0
			});

			var particleOrigX = e.particles[0].pos.x;
			var particleOrigY = e.particles[0].pos.y;

			e.update(10);

			expect(e.particles[0].pos.x).toEqual(particleOrigX);
			expect(e.particles[0].pos.y).toEqual(particleOrigY);
		});

		it('should move the particle', function() {
			e.overlay({
				life: 1,
				speed: 1,
				angle: 1,
				active: true,
				duration: 100
			});

			var particleOrigX = e.particles[0].pos.x;
			var particleOrigY = e.particles[0].pos.y;

			e.update(10);

			expect(e.particles[0].pos.x).not.toEqual(particleOrigX);
			expect(isNaN(e.particles[0].pos.x)).toBe(false);
			expect(e.particles[0].pos.y).not.toEqual(particleOrigY);
			expect(isNaN(e.particles[0].pos.y)).toBe(false);
		});

		it("should tween the particle's color", function() {
			e.overlay({
				startColor: [255, 0, 0, 1],
				endColor: [0, 0, 255, 1],
				life: 1,
				active: true,
				duration: 100
			});

			e.update(10);
			expect(e.particles[0].color[0] < 1).toBe(true);
			expect(e.particles[0].color[2] > 0).toBe(true);
		});

		it("should decrement a particle's life", function() {
			e.overlay({
				life: 10,
				active: true,
				duration: 100,
			});

			e.update(5);

			expect(e.particles[0].life).toBe(5);
			expect(e._particleCount).toBe(1);

			e.update(6);
			expect(e.particles[0].life < 0).toBe(true);
		});
	});
});

