define(function() {
	return {
		readText: function(file, callback) {
			var reader = new FileReader();
			reader.onload = function(e) {
				callback(e.target.result);
			};
			reader.readAsText(file);
		}
	};
});
