Ext.define('pjs.ui.Parser', {
	singleton: true,

	//Position,pos=vector,posVar=vector:Angle,angle=number,angleVar=number
	parse: function(raw) {
		var results = [];

		var rawEntries = raw.split(':');

		Ext.Array.forEach(rawEntries, function(rawEntry) {
			var split = rawEntry.split(',');
			var entry = {
				title: split.shift(),
				items: []
			};
			Ext.Array.forEach(split, function(rawItem) {
				var splitItem = rawItem.split('=');
				entry.items.push({
					property: splitItem[0],
					type: splitItem[1]
				});
			});
			results.push(entry);
		});

		return results;
	}
});

