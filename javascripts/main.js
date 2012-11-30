require([
	'particlesystem/PredefinedSystems', 
	'particlesystem/Emitter', 
	'particlesystem/Renderer', 
	'particlesystem/util',
	'ui/Builder',
	'third/stats.min'
],
function(predefinedSystems, Emitter, Renderer, util, Builder) {
	var paused = true;
	var lastTimestamp = 0;

	var emitter;
	var canvas;
	var context;
	var stats;

	function setupRequestAnimationFrame() {
		this.requestAnimationFrame = window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame;

		if (!this.requestAnimationFrame) {
			// polyfill, primarily for IE9
			var lastTime = 0;
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


	function initStats(statsContainerId) {
		stats = new Stats();
		stats.setMode(0);

		stats.domElement.style.position = 'absolute';
		stats.domElement.style.top = 0;
		stats.domElement.style.left = 0;

		document.getElementById(statsContainerId).appendChild(stats.domElement);

		var graphs = ['fpsGraph', 'msGraph'];
		for (var i = 0; i < graphs.length; ++i) {
			var graphId = graphs[i];
			var graph = document.getElementById(graphId);
			graph.parentNode.removeChild(graph);
		}
	}

	function draw(timestamp) {
		if (paused) {
			return;
		}
		stats.begin();

		var delta = timestamp - (lastTimestamp || timestamp);
		lastTimestamp = timestamp;

		delta /= 1000;
		emitter.update(delta);

		context.fillStyle = 'black';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		Renderer.render(context, emitter.particles);

		requestAnimationFrame(draw);
		stats.end();
	}

	var controller = {
		isPaused: function() {
			return paused;
		},
		togglePause: function() {
			paused = ! paused;

			if (!paused) {
				lastTimestamp = 0;

				// TODO: this is needed for IE10, otherwise it just doesn't
				// draw anything. So far, no clue why (haven't really looked into it)
				if(util.isIE) {
					var me = this;
					setTimeout(function() {
						me.emitter.reset();
					}, 10);
				}
				draw(new Date().getTime());
			}
		}
	};

	function launch() {
		setupRequestAnimationFrame();

		var defaultTexture = new Image();
		defaultTexture.src = 'particle.png';

		defaultTexture.onload = function() {
			canvas = document.createElement('canvas');

			var canvasSize = getCanvasSize();

			canvas.width = canvasSize.width;
			canvas.height = canvasSize.height;

			predefinedSystems.positionSystems(canvasSize);
			predefinedSystems.setTexture(defaultTexture);

			emitter = new Emitter(getUrlParam('system'), defaultTexture);
			controller.emitter = emitter;

			context = canvas.getContext('2d');

			new Builder('guiContainer', emitter, canvas, controller, getUrlParam('ui'));
			document.getElementById('canvasContainer').appendChild(canvas);
			initStats('canvasContainer');

			draw(new Date().getTime());
		};
	}

	launch();
});

