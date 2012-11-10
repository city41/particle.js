(function() {
	var maskMsg = 'bring mouse here to activate';
	Ext.define('pjs.ui.Builder', {
		singleton: true,

		requires: ['Ext.container.Viewport', 'Ext.container.Container', 'pjs.ui.*'],

		uiConfig: [{
			title: 'Predefined Systems',
			items: [{
				type: 'systempicker'
			}]
		},
		{
			title: 'Basics',
			items: [{
				type: 'vector',
				property: 'pos'
			},
			{
				type: 'vector',
				property: 'posVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'life'
			},
			{
				type: 'number',
				property: 'lifeVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'totalParticles'
			},
			{
				type: 'number',
				property: 'emissionRate'
			}]
		},
		{
			title: 'Appearance',
			items: [{
				type: 'color',
				property: 'startColor'
			},
			{
				type: 'color',
				property: 'startColorVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'color',
				property: 'endColor'
			},
			{
				type: 'color',
				property: 'endColorVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'radius'
			},
			{
				type: 'number',
				property: 'radiusVar'
			}]
		},
		{
			title: 'Texture',
			items: [{
				type: 'texture',
				property: 'texture'
			},
			{
				type: 'boolean',
				property: 'textureEnabled'
			},
			{
				type: 'boolean',
				property: 'textureAdditive'
			},
			{
				type: 'texturereset',
				property: 'texture'
			}]
		},
		{
			title: 'Physics',
			items: [{
				type: 'number',
				property: 'speed'
			},
			{
				type: 'number',
				property: 'speedVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'angle'
			},
			{
				type: 'number',
				property: 'angleVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'vector',
				property: 'gravity'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'radialAccel'
			},
			{
				type: 'number',
				property: 'radialAccelVar'
			},
			{
				type: 'divider'
			},
			{
				type: 'number',
				property: 'tangentialAccel'
			},
			{
				type: 'number',
				property: 'tangentialAccelVar'
			}]
		}],

		build: function(controller, particleSystem, chosenSystem, canvas, uiString, includeTransformFn) {
			var uiConfig = (uiString && pjs.ui.Parser.parse(uiString)) || this.uiConfig;
			this.particleSystem = particleSystem;

			if(includeTransformFn) {
				uiConfig[0].items.push({
					type: 'transformfn',
					property: 'posVarTransformFn'
				});
			}

			this.viewport = Ext.create('Ext.container.Viewport', {
				layout: 'column',
				padding: 8,
				items: [{
					xtype: 'pjscanvaswrapper',
					canvas: canvas,
					particleSystem: particleSystem,
					chosenSystem: chosenSystem,
					listeners: {
						reset: this._onReset,
						scope: this
					}
				},
				{
					xtype: 'container',
					items: this._getUIItems(particleSystem, uiConfig),
					width: Ext.isIE ? 440: 420,
					height: canvas.height + 10,
					autoScroll: true
				}],
				listeners: {
					afterrender: function(viewport) {
						Ext.getBody().mask(maskMsg);
						var picker = viewport.down('pjssystempicker');

						if (picker) {
							picker.setSystem(chosenSystem);
							picker.on('systemchange', this._onSystemChange, this);
						}
					},
					scope: this
				}
			});

			this._initFocusEvents(controller);
		},

		_onReset: function() {
			var picker = this.viewport.down('pjssystempicker');

			if(picker) {
				this.particleSystem.reconfigure(picker.getValue());
			}
			this._onSystemChange();
		},

		_onSystemChange: function() {
			var fields = Ext.ComponentQuery.query('pjsfield');

			Ext.Array.forEach(fields, function(field) {
				field.reload();
			});

			this.viewport.down('pjscanvaswrapper').reload();
		},

		_getUIItems: function(target, uiConfig) {
			var items = [];
			Ext.Array.forEach(uiConfig, function(entry) {
				items.push(this._buildGroup(target, entry.title, entry.items, uiConfig.length > 1));
			},
			this);

			return items;
		},

		_buildGroup: function(target, title, propertyConfigs, collapsible) {
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
				collapsible: collapsible,
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
				Ext.getBody().mask(maskMsg);
			}

			function resume() {
				controller.resume();
				Ext.getBody().unmask();
			}

			var listeners = {
				mouseleave: pause
			};

			// Opera is weird here, resorting to mouseover :-/
			var mouseInEvent = Ext.isOpera ? 'mouseover' : 'mouseenter';
			listeners[mouseInEvent] = resume;

			Ext.getBody().on(listeners);
		}
	});
})();

