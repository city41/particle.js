(function() {
	this.pjs = this.pjs || {};

	function colorArrayToString(array, overrideAlpha) {
		var r = (array[0] * 255) | 0;
		var g = (array[1] * 255) | 0;
		var b = (array[2] * 255) | 0;
		var a = overrideAlpha || array[0];

		return 'rgba(' + r + ', ' + g + ', ' +  b + ', ' + a + ')';
	}

	function getBuffer(texture) {
		var canvas = document.createElement('canvas');
		canvas.width = texture.width;
		canvas.height = texture.height;

		return canvas;
	}


	pjs.Renderer = {
		_renderParticle: function(context, particle) {
			var color = colorArrayToString(particle.color);

			context.fillStyle = color;
			context.beginPath();
			context.arc(particle.pos.x, particle.pos.y, particle.radius * particle.scale, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		},

		_renderParticleTexture: function(context, particle) {
			particle.buffer = particle.buffer || getBuffer(particle.texture);

			var bufferContext = particle.buffer.getContext('2d');

			var w = (particle.texture.width * particle.scale) | 0;
			var h = (particle.texture.height * particle.scale) | 0;

			var x = particle.pos.x - w / 2;
			var y = particle.pos.y - h / 2;

			bufferContext.clearRect(0, 0, particle.buffer.width, particle.buffer.height);
			bufferContext.globalAlpha = particle.color[3];
			bufferContext.drawImage(particle.texture, 0, 0);

			bufferContext.globalCompositeOperation = "source-atop";
			bufferContext.fillStyle = colorArrayToString(particle.color, 1);
			bufferContext.fillRect(0, 0, particle.buffer.width, particle.buffer.height);

			bufferContext.globalCompositeOperation = "source-over";
			bufferContext.globalAlpha = 1;

			context.drawImage(particle.buffer, 0, 0, particle.buffer.width, particle.buffer.height, x, y, w, h);
		},

		render: function(context, particles) {
			for(var i = 0; i < particles.length; ++i) {
				var p = particles[i];
				if(p.life > 0 && p.color) {
					if(!p.texture || !p.textureEnabled) {
						this._renderParticle(context, p);
					} else {
						this._renderParticleTexture(context, p);
					}
				}
			}
		}
	};

})();

