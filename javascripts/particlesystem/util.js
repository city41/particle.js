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

		if (isInteger(min) && isInteger(max) && !dontFloor) {
			return Math.floor(result);
		} else {
			return result;
		}
	};

	pjs.random11 = function() {
		return pjs.random(-1, 1, true);
	};

	pjs.extend = function(obj, config) {
		for(var prop in config) {
			if(config.hasOwnProperty(prop)) {
				obj[prop] = config[prop];
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

})();

