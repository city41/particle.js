(function() {
	this.pjs = this.pjs || {};

	function colorArrayToString(array) {
		var r = (array[0] * 255) | 0;
		var g = (array[1] * 255) | 0;
		var b = (array[2] * 255) | 0;
		var a = array[0];

		return 'rgba(' + r + ', ' + g + ', ' +  b + ', ' + a + ')';
	}



	pjs.Renderer = {
		_renderParticle: function(context, particle) {
			var color = colorArrayToString(particle.color);

			context.fillStyle = color;
			context.beginPath();
			context.arc(particle.pos.x, particle.pos.y, particle.radius, 0, Math.PI*2, true);
			context.closePath();
			context.fill();
		},

		render: function(context, particles) {
			for(var i = 0; i < particles.length; ++i) {
				var p = particles[i];
				if(p.life > 0 && p.color) {
					this._renderParticle(context, p);
				}
			}
		}
	};

})();

