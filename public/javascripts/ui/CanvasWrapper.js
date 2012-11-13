(function() {
	this.pjs = this.pjs || {};
	pjs.ui = pjs.ui || {};

	pjs.ui.CanvasWrapper = function(containerId, particleSystem, canvas, controller) {
		this.containerId = containerId;
		this.canvas = canvas;
		this.particleSystem = particleSystem;
		this.controller = controller;

		this.wrap();
	};

	pjs.ui.CanvasWrapper.prototype = {
		wrap: function() {
			var container = document.getElementById(this.containerId);
			container.appendChild(this.canvas);

			var buttonDiv = document.createElement('div');

			this._addPlayButton(buttonDiv);
			this._addResetButton(buttonDiv);
			container.appendChild(buttonDiv);
		},

		_addPlayButton: function(container) {
			var button = document.createElement('button');
			button.innerHTML = this.controller.isPaused() ? 'Play' : 'Pause';

			var me = this;

			button.onclick = function() {
				me.controller.togglePause();
				this.innerHTML = me.controller.isPaused() ? 'Play' : 'Pause';
			};

			container.appendChild(button);
		},

		_addResetButton: function(container) {
			var button = document.createElement('button');
			button.innerHTML = 'Reset';

			var me = this;
			button.onclick = function() {
				me.particleSystem.reset();
			};

			container.appendChild(button);
		}
	};
})();

