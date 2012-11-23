define(['particlesystem/util'], function(util) {
	var posFuncs = {
		center: function(size) {
			return {
				x: (size.width / 2) | 0,
				y: (size.height / 2) | 0
			};
		},
		centerBottom: function(size) {
			return {
				x: (size.width / 2) | 0,
				y: (size.height * 2 / 3) | 0
			};
		},
		centerOffBottom: function(size) {
			return {
				x: (size.width / 2) | 0,
				y: size.height + 20
			};
		},
		centerAboveTop: function(size) {
			return {
				x: (size.width / 2) | 0,
				y: 0
			};
		},
		bottomLeft: function(size){
			return {
				x: 0,
				y: size.height + 5
			};
		}
	};

	return {
		getSystem: function(name) {
			var system = this.systems[0];
			for (var i = 0; i < this.systems.length; ++i) {
				var ps = this.systems[i];
				if (ps.name === name) {
					system = ps;
					break;
				}
			}
			return util.deepClone(system, ['texture']);
		},

		positionSystems: function(size) {
			for (var i = 0; i < this.systems.length; ++i) {
				var pos = this.systems[i].system.pos;
				this.systems[i].system.pos = posFuncs[pos](size);
			}
		},

		setTexture: function(texture) {
			for (var i = 0; i < this.systems.length; ++i) {
				this.systems[i].system.texture = texture;
			}
		},

		systems: [{
			name: 'meteor',
			system: {
				totalParticles: 150,
				emissionRate: 150 / 2,
				pos: 'center',
				gravity: {
					x: - 200,
					y: - 200
				},
				angle: 90,
				angleVar: 360,
				speed: 15,
				speedVar: 5,
				life: 2,
				lifeVar: 1,
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				textureEnabled: true,
				textureAdditive: true,
				radius: 12,
				radiusVar: 2,
				startScale: 1,
				endScale: 1,
				startColor: [51, 102, 178.5, 1],
				startColorVar: [0, 0, 51, 0.1],
				endColor: [0, 0, 0, 1],
				active: true,
				duration: Infinity
			}
		},
		{
			name: 'fireworks',
			system: {
				totalParticles: 1500,
				emissionRate: 1500 / 3.5,
				pos: 'centerBottom',
				angle: 90,
				angleVar: 20,
				gravity: {
					x: 0,
					y: - 90
				},
				speed: 180,
				speedVar: 50,
				life: 3.5,
				lifeVar: 1,
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				radius: 8,
				radiusVar: 2,
				startScale: 1,
				endScale: 1,
				startColor: [127.5, 127.5, 127.5, 1],
				startColorVar: [127.5, 127.5, 127.5, 0],
				endColor: [25.5, 25.5, 25.5, 0.2],
				endColorVar: [25.5, 25.5, 25.5, 0.2],
				active: true,
				duration: Infinity
			}
		},
		{
			name: 'fire',
			system: {
				totalParticles: 250,
				emissionRate: 250 / 7,
				pos: 'centerBottom',
				posVar: {
					x: 40,
					y: 20
				},
				angle: 90,
				angleVar: 10,
				speed: 60,
				speedVar: 20,
				life: 7,
				lifeVar: 4,
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				textureEnabled: true,
				textureAdditive: true,
				radius: 10,
				radiusVar: 1,
				startScale: 1,
				endScale: 1,
				startColor: [193.8, 63.75, 30.6, 1],
				endColor: [0, 0, 0, 0],
				active: true,
				duration: Infinity
			}
		},
		{
			name: 'galaxy',
			system: {
				totalParticles: 200,
				emissionRate: 200 / 4,
				pos: 'center',
				angle: 90,
				angleVar: 360,
				speed: 60,
				speedVar: 10,
				life: 4,
				lifeVar: 1,
				radialAccel: - 80,
				radialAccelVar: 0,
				tangentialAccel: 80,
				tangentialAccelVar: 0,
				textureEnabled: true,
				textureAdditive: true,
				radius: 10,
				radiusVar: 2,
				startScale: 1,
				endScale: 1,
				startColor: [30.6, 63.75, 193.8, 1],
				endColor: [0, 0, 0, 1],
				active: true,
				duration: Infinity
			}
		},
		{
			name: 'snow',
			system: {
				totalParticles: 700,
				emissionRate: 10,
				pos: 'centerAboveTop',
				posVar: {
					x: 175,
					y: 0
				},
				gravity: {
					x: 0,
					y: 8
				},
				angle: - 90,
				angleVar: 10,
				speed: 9,
				speedVar: 1,
				life: 45,
				lifeVar: 15,
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				textureEnabled: false,
				textureAdditive: false,
				radius: 3,
				radiusVar: 2,
				startScale: 1,
				endScale: 0.3,
				startColor: [255, 255, 255, 1],
				endColor: [255, 255, 255, 0],
				active: true,
				duration: Infinity
			}
		},
		{
			name: 'bubbles',
			system: {
				totalParticles: 500,
				emissionRate: 200,
				active: true,
				duration: Infinity,
				pos: 'centerOffBottom',
				posVar: {
					x: 150,
					y: 0
				},
				angle: 90,
				angleVar: 20,
				life: 3.5,
				lifeVar: 1,
				radius: 8,
				radiusVar: 2,
				textureEnabled: false,
				textureAdditive: true,
				startScale: 1,
				startScaleVar: 0,
				endScale: 1,
				endScaleVar: 0,
				startColor: [198.9, 198.9, 255, 1],
				startColorVar: [0, 0, 38, 0.1],
				endColor: [25.5, 25.5, 25.5, 0.2],
				endColorVar: [25.5, 25.5, 25.5, 0.2],
				gravity: {
					x: 0,
					y: - 90
				},
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				speed: 180,
				speedVar: 50
			}
		},
		{
			name: 'watergeyser',
			system: {
				totalParticles: 400,
				emissionRate: 100,
				active: true,
				duration: Infinity,
				pos: 'centerBottom',
				posVar: {
					x: 0,
					y: 0
				},
				angle: 90,
				angleVar: 10,
				life: 2.5,
				lifeVar: 1,
				radius: 5,
				radiusVar: 3,
				textureEnabled: false,
				textureAdditive: false,
				startScale: 1,
				startScaleVar: 0,
				endScale: 1,
				endScaleVar: 0,
				startColor: [19.89, 59.93, 255, 1],
				startColorVar: [0, 0, 48, 0.3],
				endColor: [198.9, 198.9, 255, 0],
				endColorVar: [0, 0, 0, 0],
				gravity: {
					x: 0,
					y: 150
				},
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 0,
				tangentialAccelVar: 0,
				speed: 180,
				speedVar: 50
			}
		},
		{
			name: 'ribbon',
			system: {
				totalParticles: 200,
				emissionRate: 40,
				active: true,
				duration: Infinity,
				pos: 'bottomLeft',
				posVar: {
					x: 30,
					y: 0
				},
				angle: 55,
				angleVar: 0,
				life: 2.5,
				lifeVar: 0,
				radius: 10,
				radiusVar: 5,
				textureEnabled: false,
				textureAdditive: false,
				startScale: 1,
				startScaleVar: 0,
				endScale: 1,
				endScaleVar: 0,
				startColor: [255, 0, 0, 1],
				startColorVar: [0, 0, 0, 0],
				endColor: [0, 0, 255, 1],
				endColorVar: [0, 0, 0, 0],
				gravity: {
					x: 0,
					y: -45
				},
				radialAccel: 0,
				radialAccelVar: 0,
				tangentialAccel: 60,
				tangentialAccelVar: 0,
				speed: 180,
				speedVar: 50
			}
		}]
	};
});

