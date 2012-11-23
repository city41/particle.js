// TODO: gzip-js is a little funky here. the gzip.js file is a fully self contained pakmanager built lib.
// So requiring it here, to get the file loaded, then still have to call requiregzip('gzip-js') to actually
// get at gzip. Note the name 'requiregzip', because when compressing, gzip's require overwrote require.js's
// require. Need to get to bottom of this, for now, hackity hack!

define([
	'third/gzip',
	'third/tiff'
],
function(gzip, TIFFParser) {
	var map = {
		angleVariance: 'angleVar',
		blendFuncDestination: 'textureAdditive',
		maxParticles: 'totalParticles',
		particleLifespan: 'life',
		particleLifespanVariance: 'lifeVar',
		radialAccelVariance: 'radialAccelVar',
		radialAcceleration: 'radialAccel',
		speedVariance: 'speedVar',
		startParticleSize: 'startScale',
		endParticleSize: 'endScale',
		tangentialAcceleration: 'tangentialAccel',
		tangentialAccelVariance: 'tangentialAccelVar'
	};


	function getValue(node) {
		return node.childNodes[0].nodeValue;
	}

	function getType(node) {
		return node.tagName;
	}

	var PlistImporter = function(rawPlist) {
		this.rawPlist = rawPlist;
	};

	PlistImporter.prototype = {
		toParticleSystem: function(callback) {
			var result = this._parse(this.rawPlist);

			this._translate(result);

			if (result.textureImageData) {
				this._loadTexture(result, callback);
			} else {
				callback(result);
			}
		},

		_translate: function(system) {
			for (var prop in map) {
				var particleJsName = map[prop];
				system[particleJsName] = system[prop];
				delete system[prop];
			}

			if (system.duration = - 1) {
				system.duration = Infinity;
			}

			system.emissionRate = system.totalParticles / system.life;

			//temp
			system.startScale = 1;
			system.endScale = 1;
			system.radius = 10;
			system.radiusVar = 0;
			system.textureAdditive = !!system.textureAdditive;
			system.textureEnabled = !!system.textureImageData;
			system.active = true;

			// position
			system.pos = {
				x: system.sourcePositionx,
				y: system.sourcePositiony
			};

			// deleting these properties is unnecessary, but getting them out
			// of the way makes debugging more pleasant
			delete system.sourcePositionx;
			delete system.sourcePositiony;

			system.posVar = {
				x: system.sourcePositionVariancex,
				y: system.sourcePositionVariancey
			};
			delete system.sourcePositionVariancex;
			delete system.sourcePositionVariancey;

			system.gravity = {
				x: system.gravityx,
				y: system.gravityy
			};
			delete system.gravityx;
			delete system.gravityy;

			system.startColor = [
			system.startColorRed * 255, system.startColorGreen * 255, system.startColorBlue * 255, system.startColorAlpha];
			delete system.startColorRed;
			delete system.startColorGreen;
			delete system.startColorBlue;
			delete system.startColorAlpha;

			system.startColorVar = [
			system.startColorVarianceRed * 255, system.startColorVarianceGreen * 255, system.startColorVarianceBlue * 255, system.startColorVarianceAlpha];
			delete system.startColorVarianceRed;
			delete system.startColorVarianceGreen;
			delete system.startColorVarianceBlue;
			delete system.startColorVarianceAlpha;

			system.endColor = [
			system.finishColorRed * 255, system.finishColorGreen * 255, system.finishColorBlue * 255, system.finishColorAlpha];
			delete system.finishColorRed;
			delete system.finishColorGreen;
			delete system.finishColorBlue;
			delete system.finishColorAlpha;

			system.endColorVar = [
			system.finishColorVarianceRed * 255, system.finishColorVarianceGreen * 255, system.finishColorVarianceBlue * 255, system.finishColorVarianceAlpha];
			delete system.finishColorVarianceRed;
			delete system.finishColorVarianceGreen;
			delete system.finishColorVarianceBlue;
			delete system.finishColorVarianceAlpha;
		},

		_loadTexture: function(system, callback) {
			var imageData = this._getImageData(system.textureImageData);

			if(this._isTiff(imageData)) {
				this._parseTiff(imageData, system, callback);
			} else if(this._isPng(imageData)) {
				this._parsePng(imageData, system, callback);
			} else {
				throw new Error("Don't know what kind of image was in this plist file (not a png or tiff)");
			}
		},

		_isTiff: function(imageData) {
			// not perfect, but if we have the TIFF endian mark, probably a TIFF
			return (imageData[0] === 0x49 && imageData[1] === 0x49) 	// I I --- Intel: little endian	
				||	 (imageData[0] === 0x4D && imageData[1] === 0x4D);	// M M --- Motorola: big endian
		},

		_isPng: function(imageData) {
			return imageData[0] === 0x89
				&& imageData[1] === 0x50  // P
				&& imageData[2] === 0x4E	// N
				&& imageData[3] === 0x47; // G
		},

		_parseTiff: function(imageData, system, callback) {
			var tiffParser = new TIFFParser();

			var buffer = new ArrayBuffer(imageData.length);
			var uint8View = new Uint8Array(buffer);
			uint8View.set(imageData);

			system.texture = tiffParser.parseTIFF(buffer);
			callback(system);
		},

		_parsePng: function(imageData, system, callback) {
			// shove it all back into a base64 string, so we can take advantage of data URLs
			var asString = this._arrayToBinaryString(imageData);
			var encoded = btoa(asString);

			var img = new Image();
			img.src = 'data:image/png;base64,' + encoded;

			img.onload = function() {
				system.texture = img;
				callback(system);
			};
		},

		_getImageData: function(plistData) {
			// from base64 to ascii binary string
			var decodedAsString = atob(plistData);

			// ascii string to bytes in gzipped format
			var data = this._binaryStringToArray(decodedAsString);

			// raw, uncompressed, binary image data in an array
			return requiregzip('gzip-js').unzip(data);
		},

		_binaryStringToArray: function(binaryString) {
			var data = [];

			for (var i = 0; i < binaryString.length; ++i) {
				data[i] = binaryString.charCodeAt(i);
			}

			return data;
		},

		_arrayToBinaryString: function(array) {
			var str = '';
			for (var i = 0; i < array.length; ++i) {
				str += String.fromCharCode(array[i]);
			}
			return str;
		},

		_parse: function() {
			var domParser = new DOMParser();

			var doc = domParser.parseFromString(this.rawPlist, 'text/xml');

			var result = {};

			var keys = doc.getElementsByTagName('key');

			for (var i = 0, l = keys.length; i < l; ++i) {
				var keyNode = keys[i];
				var keyValue = getValue(keyNode);
				var valueNode = keys[i].nextElementSibling;

				var type = getType(valueNode);
				var value = getValue(valueNode);

				if (type === 'real' || type === 'integer') {
					value = parseFloat(value);
				}

				result[keyValue] = value;
			}

			return result;
		}
	};

	return PlistImporter;

});

