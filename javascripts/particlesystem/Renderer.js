define(['particlesystem/util'], function(util) {
	var bufferCache = {};

	/*
	 * Utility method to create a canvas the same size as the passed in texture (which is
	 * an Image element). Used for _renderParticleTexture
	 */
	function getBuffer(texture) {
		var size = '' + texture.width + 'x' + texture.height;

		var canvas = bufferCache[size];

		if(!canvas) {
			canvas = document.createElement('canvas');
			canvas.width = texture.width;
			canvas.height = texture.height;
			bufferCache[size] = canvas;
		}

		return canvas;
	}


	return {
		/*
		 * renders a particle to the given context without using textures. Uses
		 * the particle's color to draw a circle at the particle's location
		 * and sized to the particle
		 */
		_renderParticle: function(context, particle) {
			var color = util.colorArrayToString(particle.color);

			context.fillStyle = color;
			context.beginPath();
			context.arc(particle.pos.x, particle.pos.y, particle.radius * particle.scale, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		},

		/*
		 * renders a particle using the particle's texture. The texture is typically a white
		 * image and so need to use a secondary buffer to "tint" this image based on the 
		 * particle's color.
		 */
		_renderParticleTexture: function(context, particle) {
			particle.buffer = particle.buffer || getBuffer(particle.texture);

			var bufferContext = particle.buffer.getContext('2d');

			// figure out what size to draw the texture at, based on the particle's
			// current scale
			var w = (particle.texture.width * particle.scale) | 0;
			var h = (particle.texture.height * particle.scale) | 0;

			// figure out the x and y locations to render at, to center the texture in the buffer
			var x = particle.pos.x - w / 2;
			var y = particle.pos.y - h / 2;

			bufferContext.clearRect(0, 0, particle.buffer.width, particle.buffer.height);
			bufferContext.globalAlpha = particle.color[3];
			bufferContext.drawImage(particle.texture, 0, 0);

			// now use source-atop to "tint" the white texture, here we want the particle's pure color,
			// not including alpha. As we already used the particle's alpha to render the texture above
			bufferContext.globalCompositeOperation = "source-atop";
			bufferContext.fillStyle = util.colorArrayToString(particle.color, 1);
			bufferContext.fillRect(0, 0, particle.buffer.width, particle.buffer.height);

			// reset the buffer's context for the next time we draw the particle
			bufferContext.globalCompositeOperation = "source-over";
			bufferContext.globalAlpha = 1;

			// finally, take the rendered and tinted texture and draw it into the main canvas, at the
			// particle's location
			context.drawImage(particle.buffer, 0, 0, particle.buffer.width, particle.buffer.height, x, y, w, h);
		},

		render: function(context, particles) {
			for(var i = 0; i < particles.length; ++i) {
				var p = particles[i];
				if(p.life > 0 && p.color) {
					if(p.textureAdditive) {
						context.globalCompositeOperation = 'lighter';
					} else {
						context.globalCompositeOperation = 'source-over';
					}

					if(!p.texture || !p.textureEnabled) {
						this._renderParticle(context, p);
					} else {
						this._renderParticleTexture(context, p);
					}
				}
			}
			context.globalCompositeOperation = 'source-over';
		}
	};
});

