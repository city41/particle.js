describe('Emitter', ['particlesystem/Emitter'], function(Emitter) {
	describe('construction', function() {
		it('should require a system', function() {
			var fn = function() {
				new Emitter();
			};

			expect(fn).toThrow();
		});
	});

	describe('updating particles', function() {

	});
});

