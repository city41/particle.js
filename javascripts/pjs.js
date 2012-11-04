(function() {
	this.pjs = this.pjs || {};
	//this['pjs'] = this['pjs'] || {};
	//var pjs = this['pjs'];

	this.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame || 
		window.oRequestAnimationFrame || 
		function(callback) {
			window.setTimeout(function() {
				callback(new Date().getTime());
			}, 1 / 60 * 1000);
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
			width: width || 350,
			height: height || 400
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
		pjs.ps = particleSystem = new pjs.Emitter({
			totalParticles: 300,
			emissionRate: 50,
			pos: {
				x: 175,
				y: 350
			},
			angle: 90,
			angleVar: 20,
			speed: 25,
			speedVar: 10,
			life: 7,
			lifeVar: 4,
			radialAccel: 0,
			radialAccelVar: 0,
			tangentialAccel: 0,
			tangentialAccelVar: 0,
			radius: 10,
			radiusVar: 4,
			startScale: 1,
			endScale: 0,
			texture: pjs.defaultTexture,
			textureEnabled: true,
			startColor: [1, 0.5, 0, 0.8],
			endColor: [0, 0, 0, 0],
			active: true,
			duration: Infinity
		});

		canvas = document.createElement('canvas');

		var canvasSize = getCanvasSize();

		canvas.width = canvasSize.width;
		canvas.height = canvasSize.height;

		pjs.positionPredefinedSystems(canvasSize);

		context = canvas.getContext('2d');

		pjs.ui.Builder.build(pjs, particleSystem, canvas, getUrlParam('ui'), function() {
			draw(new Date().getTime());
		});
	};

	pjs.pause = function() {
		paused = true;
	};

	pjs.resume = function() {
		if(paused) {
			paused = false;
			lastTimestamp = 0;
			draw(new Date().getTime());
		}
	}
})();

