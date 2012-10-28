Ext.define('pjs.ui.Builder', {
	singleton: true,

	build: function(particleSystem, canvas) {
		//var container = Ext.create('Ext.container.Container');
		//container.add(this._buildGroup());
		//container.render(Ext.DomQuery.select(containerId)[0]);
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

		this.leftColumn = viewport.down('#leftColumn');
		this.rightColumn = viewport.down('#rightColumn');

		this.leftColumn.getEl().dom.appendChild(canvas);


		this.rightColumn.add(this._buildGroup(particleSystem, 'Position', [
																					{ type: 'vector', property: 'pos' },
																					{ type: 'vector', property: 'posVar' }
		]));
		this.rightColumn.add(this._buildGroup(particleSystem, 'Angle', [
																					{ type: 'number', property: 'angle' },
																					{ type: 'number', property: 'angleVar' }
		]));
		this.rightColumn.add(this._buildGroup(particleSystem, 'Color', [
																					{ type: 'color', property: 'startColor' },
																					{ type: 'color', property: 'startColorVar' },
																					{ type: 'color', property: 'endColor' },
																					{ type: 'color', property: 'endColorVar' }
		]));
		this.rightColumn.add(this._buildGroup(particleSystem, 'Physics', [
																					{ type: 'vector', property: 'gravity' },
																					{ type: 'number', property: 'radialAccel' },
																					{ type: 'number', property: 'radialAccelVar' },
																					{ type: 'number', property: 'tangentialAccel' },
																					{ type: 'number', property: 'tangentialAccelVar' }
		]));
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

