(function() {
	this.pjs = this.pjs || {};
	this.pjs.ui = this.pjs.ui || {};

	this.pjs.ui.TextureLoader = {
		load: function(target, property, file) {
			if (this.cache[file.name]) {
				this._overlay(target, property, this.cache[file.name]);
			} else {
				this._loadViaFile(target, property, file);
			}
		},

		_overlay: function(target, property, result) {
			var config = {};
			config[property] = result;
			target.overlay(config);
		},

		_loadViaFile: function(target, property, file) {
			if (!this._isImageFile(file)) {
				alert('this does not appear to be an image');
				return;
			}

			var me = this;

			var filereader = new FileReader();
			filereader.onload = function(result) {
				var image = new Image();
				image.src = result.target.result;

				me.cache[file.name] = image;
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

			if (!extension) {
				return false;
			}

			return ['png', 'jpg', 'jpeg', 'gif'].indexOf(extenstion.toLowerCase()) > -1;
		}
	};
})();

