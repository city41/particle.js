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
		var obj = {
			a: 12,
			b: {
				c: 45,
				d: 99
			}
		};

		var extension = {
			a: 55,
			b: {
				c: 99,
				d: 33,
				e: 999
			}
		};

		var originalB = obj.b;

		util.recursiveExtend(obj, extension);

		// whole point of recursiveExtend is to update primitive properties
		// while maintaining original subobjects, mostly for datGUI
		expect(obj.b).toBe(originalB);
		expect(obj.b).not.toBe(extension.b);
		expect(originalB.c).toBe(99);
		expect(originalB.d).toBe(33);
		expect(originalB.e).toBe(999);
	});

	it('should copy the references of any exceptions when recursively extending', function() {
		// recursiveExtend allows for exceptions, all exception properties are copied into the destination
		// object, so the dest object gets a reference to the existing object in the source. This is primarily
		// for the texture properties, don't want to try and recursively bring an Image object over

		var obj = {
			a: 12,
			b: {
				c: 45,
				d: 99
			},
			exception: {
				woah: 'yeah'
			}
		};

		var extension = {
			a: 55,
			b: {
				c: 99,
				d: 33,
				e: 999
			},
			exception: {
				hi: 'there'
			}
		};

		util.recursiveExtend(obj, extension, ['exception']);

		expect(obj.exception).toBe(extension.exception);
		expect(obj.b).not.toBe(extension.b);
	});

	it('should clone the object', function() {
		// clone does a shallow clone, copying over references

		var obj = {
			a: 12,
			b: {
				c: 4,
				d: 11
			}
		};

		var clone = util.clone(obj);

		expect(clone).not.toBe(obj);
		expect(clone.a).toEqual(obj.a);
		expect(clone.b).toBe(obj.b);
	});

	it('should deep clone an object', function() {
		// deep clone fully clones an object, cloning all subobjects
		
		var obj = {
			a: 12,
			b: {
				c: 66,
				d: {
					e: 99,
					f: 1111
				}
			}
		};

		var clone = util.deepClone(obj);

		expect(clone).not.toBe(obj);
		expect(clone.a).toBe(obj.a);
		expect(clone.b).not.toBe(obj.b);
		expect(clone.b.c).toBe(obj.b.c);
		expect(clone.b.d).not.toBe(obj.b.d);
		expect(clone.b.d.e).toBe(obj.b.d.e);
	});

	it('should honor exceptions when deep cloning', function() {
		// exceptions are not deep cloned, instead copied straight over, causing the result
		// to share references from the source. This is useful to not try and deep clone things like images

		var obj = {
			a: 45,
			b: {
				c: 44
			},
			d: {
				e: 99
			}
		};

		var clone = util.deepClone(obj, ['b']);

		expect(clone).not.toBe(obj);
		expect(clone.a).toBe(obj.a);
		expect(clone.b).toBe(obj.b);
		expect(clone.d).not.toBe(obj.d);
		expect(clone.d.e).toBe(obj.d.e);
	});

	it('should convert an array to a css color string', function() {
		var array = [255, 0, 0, 1];

		expect(util.colorArrayToString(array)).toBe('rgba(255, 0, 0, 1)');
	});

	it('should honor override alpha when creating color strings', function() {
		var array = [128, 128, 50, 0.2323];

		expect(util.colorArrayToString(array, .5)).toBe('rgba(128, 128, 50, 0.5)');
	});
});

