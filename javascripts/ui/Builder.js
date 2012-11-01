Ext.define('pjs.ui.Builder', {
	singleton: true,

	uiConfig: [
		{
			title: 'Basics',
			items: [
				{ type: 'vector', property: 'pos' },
				{ type: 'vector', property: 'posVar' },
				{ type: 'transformfn', property: 'posVarTransformFn' },
				{ type: 'divider' },
				{ type: 'number', property: 'life' },
				{ type: 'number', property: 'lifeVar' },
				{ type: 'divider' },
				{ type: 'number', property: 'totalParticles' },
				{ type: 'number', property: 'emissionRate' }
			]
		}, {
			title: 'Appearance',
			items: [
				{ type: 'color', property: 'startColor' },
				{ type: 'color', property: 'startColorVar' },
				{ type: 'divider' },
				{ type: 'color', property: 'endColor' },
				{ type: 'color', property: 'endColorVar' },
				{ type: 'divider' },
				{ type: 'number', property: 'radius' },
				{ type: 'number', property: 'radiusVar' }
			]
		}, {
			title: 'Physics',
			items: [
				{ type: 'number', property: 'speed' },
				{ type: 'number', property: 'speedVar' },
				{ type: 'divider' },
				{ type: 'number', property: 'angle' },
				{ type: 'number', property: 'angleVar' },
				{ type: 'divider' },
				{ type: 'vector', property: 'gravity' },
				{ type: 'divider' },
				{ type: 'number', property: 'radialAccel' },
				{ type: 'number', property: 'radialAccelVar' },
				{ type: 'divider' },
				{ type: 'number', property: 'tangentialAccel' },
				{ type: 'number', property: 'tangentialAccelVar' }
			]
		}
	],

	build: function(particleSystem, canvas, uiString) {
		var viewport = Ext.create('Ext.container.Viewport', {
			layout: 'hbox',
			padding: 8,
			items: [{
				xtype: 'pjscanvaswrapper',
				itemId: 'leftColumn',
				canvas: canvas,
				particleSystem: particleSystem
			}, {
				xtype: 'container',
				itemId: 'rightColumn',
				width: 400,
				height: canvas.height + 10,
				autoScroll: true
			}]
		});

		var uiConfig = (uiString && pjs.ui.Parser.parse(uiString)) || this.uiConfig;

		this.leftColumn = viewport.down('#leftColumn');
		this.rightColumn = viewport.down('#rightColumn');

		//this.leftColumn.getEl().dom.appendChild(canvas);

		Ext.Array.forEach(uiConfig, function(entry) {
			this.rightColumn.add(this._buildGroup(particleSystem, entry.title, entry.items));
		}, this);
	},

	_buildGroup: function(target, title, propertyConfigs) {
		var items = [];

		Ext.Array.forEach(propertyConfigs, function(config, i) {
			items.push({
				xtype: 'pjs' + config.type,
				target: target,
				property: config.property,
				padding: 6	
			});
		});

		return Ext.create('Ext.panel.Panel', {
			title: title,
			items: items,
			border: false,
			collapsible: true,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			padding: 6
		});
	}
});

