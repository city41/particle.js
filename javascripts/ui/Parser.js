(function() {
	this.pjs = this.pjs || {};
	this.pjs.ui = this.pjs.ui || {};

	//Position,pos=vector,posVar=vector:Angle,angle=number,angleVar=number
	this.pjs.ui.Parser = {
		parse: function(raw) {
			var results = [];

			if (raw === 'none') {
				return results;
			}

			var rawEntries = raw.split(':');

			for(var i = 0, l = rawEntries.length; i < l; ++i) {
				var rawEntry = rawEntries[i];
				var split = rawEntry.split(',');
				var entry = {
					title: split.shift(),
					items: []
				};

				for(var s = 0; s < split.length; ++s) {
					var rawItem = split[s];
					var splitItem = rawItem.split('=');
					entry.items.push({
						property: splitItem[0],
						type: splitItem[1]
					});
				}
				results.push(entry);
			}

			return results;
		}
	};
})();

