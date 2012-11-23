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

	});
});

