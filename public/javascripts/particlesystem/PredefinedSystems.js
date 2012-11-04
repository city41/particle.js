(function() {
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
		centerAboveTop: function(size) {
			return {
				x: (size.width / 2) | 0,
				y: -10
			};
		}
	};

	this.pjs = this.pjs || {};


	pjs.positionPredefinedSystems = function(size) {
		for(var i = 0; i < pjs.predefinedSystems.length; ++i) {
			var pos = pjs.predefinedSystems[i].system.pos;
			pjs.predefinedSystems[i].system.pos = posFuncs[pos](size);
		}
	};

	pjs.setTextureOnPredefinedSystems = function(texture) {
		for(var i = 0; i < pjs.predefinedSystems.length; ++i) {
			var ps = pjs.predefinedSystems[i].system;
			if(ps.textureEnabled) {
				ps.texture = texture;
			}
		}
	};

	pjs.predefinedSystems = [{
		name: 'meteor',
		system: {
			totalParticles: 150,
			emissionRate: 150 / 2,
			pos: 'center',
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
			radius: 12,
			radiusVar: 2,
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
			pos: 'centerBottom',
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
			texture: pjs.defaultTexture,
			textureEnabled: true,
			textureAdditive: true,
			radius: 10,
			radiusVar: 1,
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
			pos: 'center',
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
			radius: 10,
			radiusVar: 2,
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
			pos: 'centerAboveTop',
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
			pos: 'center',
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
			textureEnabled: false,
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

