define(function() {
	return {
		isIE: navigator.userAgent.indexOf('MSIE') > - 1,

		toRad: function(deg) {
			return Math.PI * deg / 180;
		},

		isNumber: function(i) {
			return typeof i === 'number';
		},

		isInteger: function(num) {
			return num === (num | 0);
		},

		random: function(minOrMax, maxOrUndefined, dontFloor) {
			dontFloor = dontFloor || false;

			var min = this.isNumber(maxOrUndefined) ? minOrMax: 0;
			var max = this.isNumber(maxOrUndefined) ? maxOrUndefined: minOrMax;

			var range = max - min;

			var result = Math.random() * range + min;

			if (this.isInteger(min) && this.isInteger(max) && ! dontFloor) {
				return Math.floor(result);
			} else {
				return result;
			}
		},

		random11: function() {
			return this.random(-1, 1, true);
		},

		extend: function(obj, config) {
			for (var prop in config) {
				if (config.hasOwnProperty(prop)) {
					obj[prop] = config[prop];
				}
			}
		},

		recursiveExtend: function(obj, config, exceptions) {
			exceptions = exceptions || [];
			for (var prop in config) {
				if (config.hasOwnProperty(prop)) {
					if (exceptions.indexOf(prop) > - 1) {
						obj[prop] = config[prop];
					} else {
						if (typeof config[prop] === 'object') {
							this.recursiveExtend(obj[prop], config[prop], exceptions);
						} else {
							obj[prop] = config[prop];
						}
					}
				}
			}
		},

		clone: function(obj) {
			var clone = {};
			this.extend(clone, obj);
			return clone;
		},

		deepClone: function(obj, exceptions) {
			exceptions = exceptions || [];
			if (typeof obj !== 'object') {
				return obj;
			}
			if (Array.isArray(obj)) {
				var cloneArray = [];
				for (var i = 0; i < obj.length; ++i) {
					cloneArray.push(this.deepClone(obj[i], exceptions));
				}
				return cloneArray;
			}

			var clone = {};
			for (var prop in obj) {
				if (exceptions.indexOf(prop) > - 1) {
					clone[prop] = obj[prop];
				} else {
					clone[prop] = this.deepClone(obj[prop], exceptions);
				}
			}
			return clone;
		},

		/*
	 * Given an array with four channels (r, g, b and a),
	 * returns a css rgba string compatible with Canvas.
	 * Optionally provide an override alpha value that will be used
	 * in place of the actual alpha (useful for texture rendering)
	 */
		colorArrayToString: function(array, overrideAlpha) {
			var r = array[0] | 0;
			var g = array[1] | 0;
			var b = array[2] | 0;
			var a = overrideAlpha || array[3];

			return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
		}
	};
});

