describe('util', ['particlesystem/util'], function(util) {
	it('should detect numbers correctly', function() {
		expect(util.isNumber(1)).toBe(true);
		expect(util.isNumber(NaN)).toBe(true);
		expect(util.isNumber(1.344)).toBe(true);
		expect(util.isNumber(-12)).toBe(true);

		expect(util.isNumber(null)).toBe(false);
		expect(util.isNumber('45')).toBe(false);
		expect(util.isNumber(undefined)).toBe(false);
		expect(util.isNumber({})).toBe(false);
	});

	it('should detect integers correctly', function() {
		expect(util.isInteger(5)).toBe(true);
		expect(util.isInteger(0)).toBe(true);
		expect(util.isInteger(-4)).toBe(true);

		expect(util.isInteger(1.234)).toBe(false);
		expect(util.isInteger(null)).toBe(false);
		expect(util.isInteger(undefined)).toBe(false);
		expect(util.isInteger(NaN)).toBe(false);
	});

	it('should convert to rads', function() {
		expect(util.toRad(180)).toEqual(Math.PI);
		expect(util.toRad(0)).toEqual(0);

		expect(util.toRad(90)).toEqual(Math.PI / 2);

		expect(util.toRad(123)).toEqual(Math.PI * 123 / 180);
	});

	it('should extend the object', function() {
		var obj = {};
		var extensions = {
			foo: 'bar',
			baz: {
				a: 1,
				b: 2
			}
		};

		util.extend(obj, extensions);

		expect(obj.foo).toBe('bar');
		// subobject references are copied
		expect(obj.baz).toEqual(extensions.baz);
		expect(obj.baz.a).toBe(1);
		expect(obj.baz.b).toBe(2);
	});

	it('should recursively extend the object', function() {
		
	});
});

