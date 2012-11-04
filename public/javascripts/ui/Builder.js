Ext.define('pjs.ui.Builder', {
	singleton: true,

	requires: [
		'Ext.container.Viewport',
		'Ext.container.Container',
		'pjs.ui.*'
	],


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
			title: 'Texture',
			items: [
				{ type: 'texture', property: 'texture' },
				{ type: 'boolean', property: 'textureEnabled' },
				{ type: 'boolean', property: 'textureAdditive' },
				{ type: 'texturereset', property: 'texture' }
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

	build: function(controller, particleSystem, chosenSystem, canvas, uiString, callback) {
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
				width: Ext.isIE ? 440 : 420,
				height: canvas.height + 10,
				autoScroll: true
			}],
			listeners: {
				afterrender: function(viewport) {
					var picker = viewport.down('pjssystempicker');

					if(picker) {
						picker.setSystem(chosenSystem);
						picker.on('systemchange', this._onSystemChange, this);
					}
					Ext.defer(callback, 200);
				},
				scope: this
			}
		});

		this._initFocusEvents(controller);
	},

	_onSystemChange: function() {
		var fields = Ext.ComponentQuery.query('pjsfield');

		Ext.Array.forEach(fields, function(field) {
			field.reload();
		});
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

		Ext.Array.forEach(propertyConfigs, function(config) {
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
			padding: 6,
			width: 400
		};
	},

	_initFocusEvents: function(controller) {
		function pause() {
			controller.pause();
			Ext.getBody().mask('bring mouse back to resume');
		}

		function resume() {
			controller.resume();
			Ext.getBody().unmask();
		}

		var config = {
			mouseleave: function() {
				pause();
			}
		};

		// opera is weird here, doesnt like mousein or mouseenter
		var enterProperty = Ext.isOpera ? 'mouseover' : 'mouseenter';
		config[enterProperty] = function() {
			resume();
		};

		Ext.getBody().on(config);

		window.onblur = pause;
		window.onfocus = resume;
	}
});

