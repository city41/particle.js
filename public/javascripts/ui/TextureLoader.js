Ext.define('pjs.ui.TextureLoader', {
	singleton: true,

	load: function(target, property, image) {
		if(Ext.isString(image)) {
			this._loadViaString(target, property, image);
		} else {
			this._loadViaFile(target, property, image);
		}
	},

	_loadViaString: function(target, property, imageSrc) {
		var image = new Image();
		image.src = imageSrc;

		this._overlay(target, property, image);
	},

	_overlay: function(target, property, result) {
		var config = {};
		config[property] = result;
		target.overlay(config);
	},

	_loadViaFile: function(target, property, file) {
		if(!this._isImageFile(file)) {
			alert('this does not appear to be an image');
			return;
		}

		var me = this;

		var filereader = new FileReader();
		filereader.onload = function(result) {
			var image = new Image();
			image.src = result.target.result;

			me._overlay(target, property, image);
		};

		filereader.onerror = function() {
			alert('failed to load the image file');
		};

		filereader.readAsDataURL(file);
	},

	_isImageFile: function(file) {
		var period = file.name.indexOf('.');

		var extension = file.name.substring(period + 1);

		if(!extension) {
			return false;
		}

		return Ext.Array.contains(['png', 'jpg', 'jpeg', 'gif'], extension.toLowerCase());
	}
});

