define(function() {
	return {
		cache: {},

		load: function(target, property, file) {
			if (this.cache[file.name]) {
				this._overlay(target, property, this.cache[file.name]);
			} else {
				this._loadViaFile(target, property, file);
			}
		},

		_overlay: function(target, property, result) {
			if(result.width) {
				target[property] = result;
			} else {
				result.onload = function() {
					target[property] = result;
				};
			}
		},

		_loadViaFile: function(target, property, file) {
			if (!this._isImageFile(file)) {
				throw new Error('this does not appear to be an image');
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

			return ['png', 'jpg', 'jpeg', 'gif'].indexOf(extension.toLowerCase()) > -1;
		}
	};
});

