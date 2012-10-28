Ext.define('pjs.ui.Builder', {
	singleton: true,

	uiConfig: [
		{
			title: 'Position',
			items: [
				{ type: 'vector', property: 'pos' },
				{ type: 'vector', property: 'posVar' }
			]
		},
		{
			title: 'Angle',
			items: [
				{ type: 'number', property: 'angle' },
				{ type: 'number', property: 'angleVar' }
			]
		}
	],

	build: function(particleSystem, canvas, uiString) {
		var viewport = Ext.create('Ext.container.Viewport', {
			layout: 'hbox',
			autoScroll: true,
			items: [{
				xtype: 'container',
				itemId: 'leftColumn'
			}, {
				xtype: 'container',
				itemId: 'rightColumn'
			}]
		});

		var uiConfig = (uiString && pjs.ui.Parser.parse(uiString)) || this.uiConfig;

		this.leftColumn = viewport.down('#leftColumn');
		this.rightColumn = viewport.down('#rightColumn');

		this.leftColumn.getEl().dom.appendChild(canvas);

		Ext.Array.forEach(uiConfig, function(entry) {
			this.rightColumn.add(this._buildGroup(particleSystem, entry.title, entry.items));
		}, this);
	},

	_buildGroup: function(target, title, propertyConfigs) {
		var items = [];

		Ext.Array.forEach(propertyConfigs, function(config) {
			items.push({
				xtype: 'pjs' + config.type,
				target: target,
				property: config.property
			});
		});

		return Ext.create('Ext.panel.Panel', {
			title: title,
			items: items
		});
	}
});

