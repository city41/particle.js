(function() {
	this.pjs = this.pjs || {};
	var lastTime = 0;

	this.requestAnimationFrame = window.requestAnimationFrame || 
		window.mozRequestAnimationFrame || 
		window.webkitRequestAnimationFrame || 
		window.msRequestAnimationFrame || 
		window.oRequestAnimationFrame;

	if (!this.requestAnimationFrame) {
		// polyfill, primarily for IE9
		this.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			},
			timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	function getUrlParam(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.href);

		return (results && results[1]) || '';
	}

	function getCanvasSize() {
		var width = getUrlParam('w');
		var height = getUrlParam('h');

		return {
			width: + width || 250,
			height: + height || 300
		};
	}

	var paused = false;
	var lastTimestamp = 0;

	var particleSystem;
	var canvas;
	var context;

	function draw(timestamp) {
		if (paused) {
			return;
		}

		var delta = timestamp - (lastTimestamp || timestamp);
		lastTimestamp = timestamp;

		delta /= 1000;
		particleSystem.update(delta);

		context.fillStyle = 'black';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		pjs.Renderer.render(context, particleSystem.particles);

		requestAnimationFrame(draw);
	}

	pjs.onReady = function() {
		pjs.defaultTexture = new Image();
		pjs.defaultTexture.src = 'particle.png';

		pjs.defaultTexture.onload = function() {
			canvas = document.createElement('canvas');

			var canvasSize = getCanvasSize();

			canvas.width = canvasSize.width;
			canvas.height = canvasSize.height;

			pjs.predefinedSystems.positionSystems(canvasSize);
			pjs.predefinedSystems.setTexture(pjs.defaultTexture);

			var system = pjs.predefinedSystems.getSystem(getUrlParam('system'));
			pjs.ps = particleSystem = new pjs.Emitter(system);

			context = canvas.getContext('2d');

			var includeTransformFn = getUrlParam('transform') === 'true';

			if (!includeTransformFn) {
				pjs.predefinedSystems.deleteSystem('ringoffire');
			}

			//pjs.ui.Builder.build(pjs, particleSystem, system, canvas, getUrlParam('ui'), includeTransformFn);
			new pjs.ui.Builder('guiContainer', particleSystem, canvas, getUrlParam('ui'), includeTransformFn);
			new pjs.ui.CanvasWrapper('canvasContainer', particleSystem, canvas, pjs);

			draw(new Date().getTime());
		};
	};

	pjs.isPaused = function() {
		return paused;
	};

	pjs.togglePause = function() {
		paused = ! paused;

		if (!paused) {
			lastTimestamp = 0;
			draw(new Date().getTime());
		}
	};
})();

