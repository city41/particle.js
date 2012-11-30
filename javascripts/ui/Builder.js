define([
	'particlesystem/PredefinedSystems',
	'ui/FullConfig', 
	'ui/PropertyMap', 
	'ui/Parser',
	'third/dat.gui.min'
], 
function(predefinedSystems, fullConfig, propertyMap, Parser) {
	var Builder = function(containerId, particleSystem, canvas, controller, uiString) {
		this.containerId = containerId;
		this.particleSystem = particleSystem;
		this.canvas = canvas;
		this.controller = controller;
		this.uiConfig = uiString && Parser.parse(uiString) || fullConfig;

		this.build();
	};

	Builder.prototype = {
		build: function() {
			var gui = new dat.GUI({ resizable: false, width: 370 });
			this.rootGui = gui;

			this._addPlayButton(gui);
			this._addResetButton(gui);

			var useFolders = this.uiConfig.length > 1;

			for (var i = 0; i < this.uiConfig.length; ++i) {
				var config = this.uiConfig[i];
				if (useFolders) {
					var folder = gui.addFolder(config.title || 'Section');
				} else {
					folder = gui;
				}
				for (var k = 0; k < config.items.length; ++k) {
					this._addItem(folder, config.items[k]);
				}
			}

			if(!useFolders) {
				this._openAllSubFolders();
			}
		},

		_openAllSubFolders: function() {
			for(var folderName in this.rootGui.__folders) {
				if(this.rootGui.__folders.hasOwnProperty(folderName)) {

					var folder = this.rootGui.__folders[folderName];
					folder.closed = false;
				}
			}
		},

		_updateDisplays: function(gui) {
			for (var folderName in gui.__folders) {
				if (gui.__folders.hasOwnProperty(folderName)) {
					this._updateDisplays(gui.__folders[folderName]);
				}
			}
			for (var i = 0; i < gui.__controllers.length; ++i) {
				gui.__controllers[i].updateDisplay();
			}
		},

		_addPlayButton: function(gui) {
			var c = gui.add(this.controller, 'togglePause').name(this.controller.isPaused() ? 'Play': 'Pause');
			var me = this;
			c.__onChange = function() {
				// opposite, because togglePause hasnt been called yet
				c.name(me.controller.isPaused() ? 'Pause': 'Play');
			};
		},

		_addResetButton: function(gui) {
			var c = gui.add(this.particleSystem, 'reset').name('Reset');
			var me = this;
			c.onChange(function() {
				setTimeout(function() {
					me._updateDisplays(me.rootGui);
				}, 0);
			});
		},

		_addItem: function(gui, item) {
			var type = propertyMap[item];
			this['_' + type](gui, item);
		},

		_boolean: function(gui, property) {
			gui.add(this.particleSystem, property);
		},

		_color: function(gui, property) {
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
			for (var i = 0; i < predefinedSystems.systems.length; ++i) {
				var system = predefinedSystems.systems[i];
				systems.push(system.name);
			}

			var c = gui.add(this.particleSystem, 'predefinedSystem', systems);
			var me = this;
			c.onChange(function() {
				me._updateDisplays(me.rootGui);
			});
		},

		_texture: function(gui) {
			gui.addFile(this.particleSystem, 'textureFile');
			gui.add(this.particleSystem, 'resetTexture');
		}
	};

	return Builder;
});

