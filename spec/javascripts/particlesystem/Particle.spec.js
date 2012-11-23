describe('Particle', ['particlesystem/Particle', 'particlesystem/util'], function(Particle, util) {
	describe('construction', function() {
		it('should default to zero', function() {
			var p = new Particle();

			expect(p.pos.x).toBe(0);
			expect(p.pos.y).toBe(0);
			expect(p.vel.x).toBe(0);
			expect(p.vel.y).toBe(0);
		});
	});

	describe('methods', function() {
		it('should translate angle and speed to a velocity vector', function() {
			var angle = 44;
			var speed = 3;
			var p = new Particle();

			var expectedX = Math.cos(util.toRad(angle)) * speed;
			var expectedY = - Math.sin(util.toRad(angle)) * speed;

			p.setVelocity(angle, speed);

			expect(p.vel.x).toEqual(expectedX);
			expect(p.vel.y).toEqual(expectedY);
		});
	});
});

