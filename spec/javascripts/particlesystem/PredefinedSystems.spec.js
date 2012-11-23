describe('PredefinedSystems', ['particlesystem/PredefinedSystems'], function(predefinedSystems) {
	it('should return a clone of the system', function() {
		var system1 = predefinedSystems.getSystem('meteor');
		var system2 = predefinedSystems.getSystem('meteor');

		expect(system1).not.toBe(system2);
		expect(system1.life).toEqual(system2.life);
	});

	it('should default to the first system if asked for a non-existant one', function() {
		var defaulted = predefinedSystems.getSystem('doesnotexist');
		var first = predefinedSystems.systems[0];

		expect(defaulted).toEqual(first);
	});

	it('should set a texture on all the systems', function() {
		var texture = { foo: 'bar' };
		predefinedSystems.setTexture(texture);

		predefinedSystems.systems.forEach(function(system) {
			expect(system.system.texture).toBe(texture);
		});
	});
});

