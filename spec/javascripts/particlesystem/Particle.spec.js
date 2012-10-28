describe('Particle', function() {
	describe('construction', function() {
		it('should default to zero', function() {
			var p = new pjs.Particle();

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
			var p = new pjs.Particle();

			var expectedX = Math.cos(pjs.toRad(angle)) * speed;
			var expectedY = -Math.sin(pjs.toRad(angle)) * speed;

			p.setVelocity(angle, speed);

			expect(p.vel.x).toEqual(expectedX);
			expect(p.vel.y).toEqual(expectedY);
		});
	});
});

