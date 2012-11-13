(function() {
	this.pjs = this.pjs || {};
	pjs.ui = pjs.ui || {};
	
	pjs.ui.DatBuilder = function(controller, particleSystem, chosenSystem, canvas, uiString, includeTransformFn) {
		this.controller = controller;
		this.particleSystem = particleSystem;
		this.chosenSystem = chosenSystem;
		this.canvas = canvas;
		this.uiConfig = uiString && pjs.ui.Parser.parse(uiString) || pjs.ui.FullConfig;
		this.includeTransformFn = includeTransformFn;

		this.build();
	};

	pjs.ui.DatBuilder.prototype = {
		build: function() {
			var gui = new dat.GUI();

			// TODO, pass this ID in
			document.getElementById('guiContainer').appendChild(gui.domElement);

			var useFolders = this.uiConfig.length > 1;

			for(var i = 0; i < this.uiConfig.length; ++i) {
				var config = this.uiConfig[i];
				if(useFolders) {
					var folder = gui.addFolder(config.title || 'Section');
				} else {
					folder = gui;
				}
				for(var k = 0; k < config.items.length; ++k) {
					this._addItem(folder, config.items[k]);
				}
			}
		},

		_addItem: function(gui, item) {
			this['_' + item.type](gui, item.property);
		},

		_boolean: function(gui, property) {
			gui.add(this.particleSystem, property);
		},

		_color: function(gui, property) {
			var folder = gui.addFolder(property);
			folder.addColor(this.particleSystem, property).name('color');
			folder.add(this.particleSystem[property], '3').min(0).max(1).name('alpha');
		},

		_colorvar: function(gui, property) {
			var folder = gui.addFolder(property);
			folder.add(this.particleSystem[property], '0').min(0).max(255).name('red');
			folder.add(this.particleSystem[property], '1').min(0).max(255).name('green');
			folder.add(this.particleSystem[property], '2').min(0).max(255).name('blue');
			folder.add(this.particleSystem[property], '3').min(0).max(1).name('alpha');
		},

		_posvector: function(gui, property) {
			var folder = gui.addFolder(property);
			folder.add(this.particleSystem[property], 'x').min(0).max(this.canvas.width);
			folder.add(this.particleSystem[property], 'y').min(0).max(this.canvas.height);
		},

		_vector: function(gui, property) {
			var folder = gui.addFolder(property);
			folder.add(this.particleSystem[property], 'x').min(-500).max(500);
			folder.add(this.particleSystem[property], 'y').min(-500).max(500);
		},

		_number: function(gui, property) {
			return gui.add(this.particleSystem, property).min(-500).max(500);
		},

		_unsignednumber: function(gui, property) {
			gui.add(this.particleSystem, property).min(0).max(1000);
		},


		_systempicker: function(gui) {
			var systems = [];
			for(var i = 0; i < pjs.predefinedSystems.systems.length; ++i) {
				var system = pjs.predefinedSystems.systems[i];
				systems.push(system.name);
			}

			gui.add(this.particleSystem, 'currentSystem', systems);
		},

		_texture: function() {},
		_texturereset: function() {}
	};
})();

