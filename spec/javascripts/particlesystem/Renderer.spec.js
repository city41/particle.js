describe('Renderer', ['particlesystem/Renderer', 'particlesystem/Particle', 'particlesystem/util'], function(Renderer, Particle, util) {
	var particles;
	var context;

	beforeEach(function() {
		particles = [new Particle(), new Particle()];

		particles.forEach(function(p) {
			p.life = 5;
			p.color = [255, 0, 0, 1]
		});

		context = {
			beginPath: function() {},
			arc: function() {},
			closePath: function() {},
			fill: function() {},
			drawImage: function() {}
		};
	});

	it("shouldn't render anything if particles are all dead", function() {
		particles.forEach(function(p) {
			p.life = 0;
		});

		spyOn(context, 'arc');

		Renderer.render(context, particles);

		expect(context.arc).not.toHaveBeenCalled();
	});

	it("shouldn't render anything if no particles have color", function() {
		particles.forEach(function(p) {
			delete p.color;
		});

		spyOn(context, 'arc');

		Renderer.render(context, particles);

		expect(context.arc).not.toHaveBeenCalled();
	});

	it('should render particles using arc', function() {
		spyOn(context, 'arc');

		Renderer.render(context, particles);

		expect(context.arc).toHaveBeenCalled();
	});

	it("should render using the particle's color", function() {
		Renderer.render(context, particles);
		expect(context.fillStyle).toEqual(util.colorArrayToString(particles[1].color));
	});

	it('should have particles share a common texture buffer', function() {
		particles.forEach(function(p) {
			p.texture = document.createElement('canvas');
			p.texture.width = 20;
			p.texture.height = 30;
			p.textureEnabled = true;
		});

		Renderer.render(context, particles);

		expect(particles[0].buffer).toBeDefined();
		expect(particles[1].buffer).toBeDefined();

		expect(particles[0].buffer).toEqual(particles[1].buffer);
		
		expect(particles[0].buffer.width).toBe(20);
		expect(particles[0].buffer.height).toBe(30);
	});

	it('should return to source-over when finished', function() {
		particles.forEach(function(p) {
			p.textureAdditive = true;
		});

		Renderer.render(context, particles);

		expect(context.globalCompositeOperation).toBe('source-over');
	});
});

