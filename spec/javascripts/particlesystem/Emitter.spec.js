describe('Emitter', function() {
	describe('construction', function() {
		it('should have reasonable defaults', function() {
			var e = new pjs.Emitter();

			expect(e.startColor).toEqual([0,0,0,0]);
			expect(e.startColorVar).toEqual([0,0,0,0]);
			expect(e.endColor).toEqual([0,0,0,0]);
			expect(e.endColorVar).toEqual([0,0,0,0]);

			expect(e.totalParticles).toBe(0);
			expect(e.emissionRate).toBe(0);
			expect(e.active).toBe(false);
			expect(e.duration).toBe(Infinity);

			expect(e.angle).toBe(0);
			expect(e.angleVar).toBe(0);
		});
	});

	describe('updating particles', function() {
		

	});
});

