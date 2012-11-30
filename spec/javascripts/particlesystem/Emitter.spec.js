describe('Emitter', ['particlesystem/Emitter'], function(Emitter) {
	describe('construction', function() {
		it('should not require any parameters', function() {
			var fn = function() {
				new Emitter();
			};

			expect(fn).not.toThrow();
		});

		it('should have defaulted all attributes', function() {
			var e = new Emitter({
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
				gravity: {
					x: xGravity,
					y: yGravity
				}
			});

			expect(e.gravity.x).toBe(xGravity);
			expect(e.gravity.y).toBe(yGravity);
		});

		it('should apply arbitrary attributes', function() {
			var e = new Emitter({
				notReallyAParticleSystemAttribute: 'hello'
			});

			expect(e.notReallyAParticleSystemAttribute).toBe('hello');
		});
	});

	describe('updating', function() {
		var e;
		beforeEach(function() {
			e = new Emitter({
				totalParticles: 1,
				emissionRate: 1
			});
		});

		it('should have a particle', function() {
			expect(e.particles.length).toBe(1);
		});

		it("should not do anything if it's not active", function() {
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

		describe("physics", function() {
			it("should apply gravity", function() {
				var gravX = 10;
				var gravY = 10;
				var posX = 2;
				var posY = 2;
				var delta = 10;

				e.overlay({
					gravity: {
						x: gravX,
						y: gravY
					},
					speed: 0,
					angle: 0,
					pos: {
						x: posX,
						y: posY
					},
					life: 100,
					active: true,
					duration: 100
				});

				e.update(delta);

				// initial velocity is zero
				var expectedVelX = 0 + gravX * delta;
				var expectedPosX = posX + expectedVelX * delta;
				var expectedVelY = 0 + gravY * delta;
				var expectedPosY = posY + expectedVelY * delta;

				expect(e.particles[0].vel.x).toBe(expectedVelX);
				expect(e.particles[0].vel.y).toBe(expectedVelY);
				expect(e.particles[0].pos.x).toBe(expectedPosX);
				expect(e.particles[0].pos.y).toBe(expectedPosY);
			});

			it('should not apply radial accel until the particle is away from the emitter', function() {
				var posX = 2;
				var posY = 2;
				var speed = 5;
				var delta = 10;
				var radialAccel = 100;

				e.overlay({
					pos: {
						x: posX,
						y: posY
					},
					speed: speed,
					angle: 0,
					radialAccel: radialAccel,
					life: 100,
					active: true,
					duration: 100
				});

				e.update(delta);

				var expectedPosX = posX + speed * delta;
				// angle is zero, not headed in the y direction
				var expectedPosY = posY;

				expect(e.particles[0].pos.x).toBe(expectedPosX);
				expect(e.particles[0].pos.y).toBe(expectedPosY);

				var curVelX = e.particles[0].vel.x;
				var curVelY = e.particles[0].vel.y;
				var curPosX = e.particles[0].pos.x;
				var curPosY = e.particles[0].pos.y;

				// this time, radial accel should be applied
				e.update(delta);

				var radialX = 100;
				var radialY = 0;

				var expectedVelX = curVelX + radialX * delta;
				var expectedPosX = curPosX + expectedVelX * delta;
				var expectedVelY = curVelY + radialY * delta;
				var expectedPosY = curPosY + expectedVelY * delta;

				expect(e.particles[0].vel.x).toBe(expectedVelX);
				expect(e.particles[0].vel.y).toBe(expectedVelY);
				expect(e.particles[0].pos.x).toBe(expectedPosX);
				expect(e.particles[0].pos.y).toBe(expectedPosY);
			});
		});

		describe('resetting', function() {
			it('should reset the texture', function() {
				var texture = 'im a texture';
				expect(e.texture).toBe(null);

				e._defaultTexture = texture;

				e.resetTexture();

				expect(e.texture).toBe(texture);
			});

			it('should reset to its original system', function() {
				var originalSystem = {
					totalParticles: 20,
					emissionRate: 729,
					pos: {
						x: 10,
						y: 20
					}
				};

				var e = new Emitter(originalSystem);

				e.overlay({
					totalParticles: 3,
					emissionRate: 10,
					pos: {
						x: 4,
						y: 4
					}
				});

				expect(e.totalParticles).toBe(3);
				expect(e.emissionRate).toBe(10);
				expect(e.pos.x).toBe(4);
				expect(e.pos.y).toBe(4);

				e.reset();

				expect(e.totalParticles).toBe(20);
				expect(e.emissionRate).toBe(729);
				expect(e.pos.x).toBe(10);
				expect(e.pos.y).toBe(20);
			});
		});
	});
});

