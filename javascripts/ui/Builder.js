Ext.define('pjs.ui.Builder', {
	singleton: true,

	// TODO: just make this a ui string
	uiConfig: [
		{
			title: 'Predefined Systems',
			items: [
				{ type: 'systempicker' }
			]
		}, {
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

	build: function(controller, particleSystem, canvas, uiString, callback) {
		var uiConfig = (uiString && pjs.ui.Parser.parse(uiString)) || this.uiConfig;

		Ext.create('Ext.container.Viewport', {
			layout: 'hbox',
			padding: 8,
			items: [{
				xtype: 'pjscanvaswrapper',
				canvas: canvas,
				particleSystem: particleSystem
			}, {
				xtype: 'container',
				items: this._getUIItems(particleSystem, uiConfig),
				width: 500,
				height: canvas.height + 10,
				autoScroll: true
			}],
			listeners: {
				afterrender: callback
			}
		});

		this._initMouseEvents(controller);
	},

	_getUIItems: function(target, uiConfig) {
		var items = [];
		Ext.Array.forEach(uiConfig, function(entry) {
			items.push(this._buildGroup(target, entry.title, entry.items));
		}, this);

		return items;
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

		return {
			xtype: 'panel',
			title: title,
			items: items,
			border: false,
			collapsible: true,
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			padding: 6
		};
	},

	_initMouseEvents: function(controller) {
		Ext.getBody().on({
			mouseenter: function() {
				controller.resume();
			},
			mouseleave: function() {
				controller.pause();
			}
		});
	}
});

