(function() {
	function isInteger(num) {
		return num === (num | 0);
	}

	this.pjs = this.pjs || {};

	pjs.toRad = function(deg) {
		return Math.PI * deg / 180;
	};

	pjs.random = function(minOrMax, maxOrUndefined, dontFloor) {
		dontFloor = dontFloor || false;

		var min = pjs.isNumber(maxOrUndefined) ? minOrMax: 0;
		var max = pjs.isNumber(maxOrUndefined) ? maxOrUndefined: minOrMax;

		var range = max - min;

		var result = Math.random() * range + min;

		if (isInteger(min) && isInteger(max) && ! dontFloor) {
			return Math.floor(result);
		} else {
			return result;
		}
	};

	pjs.random11 = function() {
		return pjs.random(-1, 1, true);
	};

	pjs.extend = function(obj, config) {
		for (var prop in config) {
			if (config.hasOwnProperty(prop)) {
				obj[prop] = config[prop];
			}
		}
	};

	pjs.recursiveExtend = function(obj, config, exceptions) {
		for (var prop in config) {
			if (config.hasOwnProperty(prop)) {
				if (exceptions.indexOf(prop) > - 1) {
					obj[prop] = config[prop];
				} else {
					if (typeof config[prop] === 'object') {
						pjs.recursiveExtend(obj[prop], config[prop], exceptions);
					} else {
						obj[prop] = config[prop];
					}
				}
			}
		}
	};

	pjs.isNumber = function(i) {
		return typeof i === 'number';
	};

	pjs.clone = function(obj) {
		var clone = {};
		pjs.extend(clone, obj);
		return clone;
	};

	pjs.deepClone = function(obj, exceptions) {
		if (typeof obj !== 'object') {
			return obj;
		}
		if (Array.isArray(obj)) {
			var cloneArray = [];
			for (var i = 0; i < obj.length; ++i) {
				cloneArray.push(pjs.deepClone(obj[i], exceptions));
			}
			return cloneArray;
		}

		var clone = {};
		for (var prop in obj) {
			if (exceptions.indexOf(prop) > - 1) {
				clone[prop] = obj[prop];
			} else {
				clone[prop] = pjs.deepClone(obj[prop], exceptions);
			}
		}
		return clone;
	};

})();

