(function() {
	this.pjs = this.pjs || {};
	pjs.ui = pjs.ui || {};
	
	pjs.ui.DatBuilder = function(controller, particleSystem, chosenSystem, canvas, uiString, includeTransformFn) {
		this.controller = controller;
		this.particleSystem = particleSystem;
		this.chosenSystem = chosenSystem;
		this.canvas = canvas;
		uiString = 'Color,startColor=color,endColor=color,textureAdditive=boolean';
		this.uiConfig = pjs.ui.Parser.parse(uiString);
		this.includeTransformFn = includeTransformFn;

		this.build();
	};

	pjs.ui.DatBuilder.prototype = {
		build: function() {
			var gui = new dat.GUI();
			document.getElementById('guiContainer').appendChild(gui.domElement);

			for(var i = 0; i < this.uiConfig.length; ++i) {
				var config = this.uiConfig[i];
				var folder = gui.addFolder(config.title || 'Section');
				for(var k = 0; k < config.items.length; ++k) {
					this._addItem(folder, config.items[k]);
				}
			}
		},

		_addItem: function(gui, item) {
			this['_add' + item.type](gui, item.property);
		},

		_addboolean: function(gui, property) {
			gui.add(this.particleSystem, property);
		},

		_addcolor: function(gui, property) {
			var c = gui.addColor(this.particleSystem, property);
			c.onChange(function(value) {
				debugger;
			});
		},

		_addnumber: function(gui, property) {
			var me = this;
			var c = gui.add(this.particleSystem, property);
			c.onChange(function(value) {
				var config = {};
				config[property] = value;
				me.particleSystem.overlay(config);
			});
		},

		_addtexture: function() {},
		_addvector: function() {},
		_addtexturereset: function() {},
		_addsystempicker: function() {},
		_adddivider: function() {}
	};
})();

