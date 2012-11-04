(function() {
	this.pjs = this.pjs || {};

	this.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame || function(callback) {
		window.setTimeout(function() {
			callback(new Date().getTime());
		},
		1 / 60 * 1000);
	};

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
			width: width || 250,
			height: height || 300
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

			pjs.positionPredefinedSystems(canvasSize);
			pjs.setTextureOnPredefinedSystems(pjs.defaultTexture);

			pjs.ps = particleSystem = new pjs.Emitter(pjs.predefinedSystems[0].system);

			context = canvas.getContext('2d');

			pjs.ui.Builder.build(pjs, particleSystem, canvas, getUrlParam('ui'), function() {
				draw(new Date().getTime());
			});
		};
	};

	pjs.pause = function() {
		paused = true;
	};

	pjs.resume = function() {
		if (paused) {
			paused = false;
			lastTimestamp = 0;
			draw(new Date().getTime());
		}
	}
})();

