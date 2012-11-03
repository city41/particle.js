(function() {
	this.pjs = this.pjs || {};

	pjs.defaultTexture = new Image();
	pjs.defaultTexture.src = 'particle.png';

	pjs.predefinedSystems = [{
		name: 'meteor',
		system: {
			totalParticles: 150,
			emissionRate: 150 / 2,
			pos: {
				x: 250,
				y: 250
			},
			gravity: {
				x: -200,
				y: -200
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
			texture: pjs.defaultTexture,
			textureEnabled: true,
			textureAdditive: true,
			radius: 60,
			radiusVar: 10,
			startScale: 1,
			endScale: 1,
			startColor: [0.2, 0.4, 0.7, 1],
			startColorVar: [0, 0, 0.2, 0.1],
			endColor: [0, 0, 0, 1],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'fireworks',
		system: {
			totalParticles: 1500,
			emissionRate: 1500 / 3.5,
			pos: {
				x: 175,
				y: 350
			},
			angle: 90,
			angleVar: 20,
			gravity: {
				x: 0,
				y: -90
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
			startColor: [0.5, 0.5, 0.5, 1],
			startColorVar: [0.5, 0.5, 0.5, 0.1],
			endColor: [0.1, 0.1, 0.1, 0.2],
			endColorVar: [0.1, 0.1, 0.1, 0.2],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'fire',
		system: {
			totalParticles: 250,
			emissionRate: 250 / 7,
			pos: {
				x: 175,
				y: 350
			},
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
			texture: pjs.defaultTexture,
			textureEnabled: true,
			textureAdditive: true,
			radius: 54,
			radiusVar: 10,
			startScale: 1,
			endScale: 1,
			startColor: [0.76, 0.25, 0.12, 1],
			endColor: [0, 0, 0, 1],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'galaxy',
		system: {
			totalParticles: 200,
			emissionRate: 200 / 4,
			pos: {
				x: 175,
				y: 200
			},
			angle: 90,
			angleVar: 360,
			speed: 60,
			speedVar: 10,
			life: 4,
			lifeVar: 1,
			radialAccel: -80,
			radialAccelVar: 0,
			tangentialAccel: 80,
			tangentialAccelVar: 0,
			texture: pjs.defaultTexture,
			textureEnabled: true,
			textureAdditive: true,
			radius: 37,
			radiusVar: 10,
			startScale: 1,
			endScale: 1,
			startColor: [0.12, 0.25, 0.76, 1],
			endColor: [0, 0, 0, 1],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'snow',
		system: {
			totalParticles: 700,
			emissionRate: 10,
			pos: {
				x: 175,
				y: -10
			},
			posVar: {
				x: 175,
				y: 0
			},
			gravity: {
				x: 0,
				y: 8
			},
			angle: -90,
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
			startColor: [1, 1, 1, 1],
			endColor: [1, 1, 1, 0],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'spiral',
		system: {
			totalParticles: 500,
			emissionRate: 500 / 12,
			pos: {
				x: 175,
				y: 200
			},
			angle: 90,
			angleVar: 0,
			speed: 150,
			speedVar: 0,
			life: 12,
			lifeVar: 0,
			radialAccel: -380,
			radialAccelVar: 0,
			tangentialAccel: 45,
			tangentialAccelVar: 0,
			texture: pjs.defaultTexture,
			textureEnabled: true,
			textureAdditive: false,
			radius: 10,
			startScale: 1,
			endScale: 1,
			startColor: [0.5, 0.5, 0.5, 1],
			startColorVar: [0.5, 0.5, 0.5, 0],
			endColor: [0.5, 0.5, 0.5, 1],
			endColorVar: [0.5, 0.5, 0.5, 0],
			active: true,
			duration: Infinity
		}
	}];

})();

