(function() {
	this.ps = this.ps || {};

	this.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame || function(callback) {
		window.setTimeout(callback, 1 / 60 * 1000);
	};

	var particles = [];
	var lastTimestamp;
	var canvas;
	var context;
	var startingPosition;

	function coinFlip() {
		return Math.random() > .5 ? 1 : -1;
	}

	ps.toRad = function(degrees) {
		return degrees * Math.PI / 180;
	};

	function onSingleClick() {
		var angle = 90 + Math.random() * 180 * coinFlip();
		var speed = Math.random() * 60 + 20;
		var randomBlue = ((Math.random() * 80) | 0) + 175;
		var color = 'rgb(0, 0, ' + randomBlue + ')';
		var size = Math.random() * 6 + 4;
		var life = Math.random() + 2;
		particles.push(new ps.Particle(startingPosition, angle, speed, life, color, size));
	}

	function onManyAtOnceClick() {
		for (var i = 0; i < 100; ++i) {
			onSingleClick();
		}
	}

	function onManyInSequenceClick() {
		var count = 100;

		function releaseOne() {
			onSingleClick(); --count;
			if (count > 0) {
				setTimeout(releaseOne, 60);
			}
		}
		releaseOne();
	}

	function draw() {

		context.fillStyle = 'black';
		context.fillRect(0, 0, context.canvas.width, context.canvas.height);

		particles.forEach(function(particle) {
			if (particle.life > 0) {
				context.fillStyle = particle.color;
				context.globalAlpha = particle.life / particle.startingLife;
				context.beginPath();
				context.arc(particle.pos.x, particle.pos.y, particle.size, 0, Math.PI * 2);
				context.closePath();
				context.fill();
			}
		});
		context.globalAlpha = 1;

		context.fillStyle = 'green';
		var size = 10;
		context.fillRect(startingPosition.x - size / 2, startingPosition.y - size / 2 + size, size, size);
	}

	function play(timestamp) {
		var delta = timestamp - (lastTimestamp || timestamp);
		lastTimestamp = timestamp;

		delta /= 1000;

		for(var i = 0, l = particles.length; i < l; ++i) {
			particles[i].update(delta);
		}

		draw();
		window.requestAnimationFrame(play);
	}

	this.ps.sandbox = {
		init: function() {
			canvas = document.getElementById('canvas');
			context = document.getElementById('canvas').getContext('2d');
			startingPosition = {
				x: canvas.width / 2,
				y: canvas.height / 2
			};

			var singleButton = document.getElementById('single');
			singleButton.addEventListener('click', onSingleClick, false);

			var manyAtOnceButton = document.getElementById('manyAtOnce');
			manyAtOnceButton.addEventListener('click', onManyAtOnceClick, false);

			var manyInSequenceButton = document.getElementById('manyInSequence');
			manyInSequenceButton.addEventListener('click', onManyInSequenceClick, false);
		},

		go: function() {
			play(new Date().getTime());
		}
	};
})();

