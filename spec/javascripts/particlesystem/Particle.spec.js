describe('Particle', function() {
	describe('construction', function() {
		it('should assign x and y', function() {
			expect(new pjs.Particle(4, 0).pos.x).toEqual(4);
			expect(new pjs.Particle(0, 6).pos.y).toEqual(6);
		});

		it('should translate angle and speed to a velocity vector', function() {
			var angle = 44;
			var speed = 3;
			var p = new pjs.Particle(0, 0, angle, speed);

			var expectedX = Math.cos(pjs.toRad(angle)) * speed;
			var expectedY = Math.sin(pjs.toRad(angle)) * speed;

			expect(p.vel.x).toEqual(expectedX);
			expect(p.vel.y).toEqual(expectedY);
		});
	});
});

