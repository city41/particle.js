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

		var min = _.isNumber(maxOrUndefined) ? minOrMax: 0;
		var max = _.isNumber(maxOrUndefined) ? maxOrUndefined: minOrMax;

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

})();

