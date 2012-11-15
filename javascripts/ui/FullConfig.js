(function() {
	this.pjs = this.pjs || {};
	this.pjs.ui = this.pjs.ui || {};

	this.pjs.ui.PropertyMap = {
		pos: 'posvector',
		posVar: 'posvector',
		life: 'unsignednumber',
		lifeVar: 'unsignednumber',
		totalParticles: 'unsignednumber',
		emissionRate: 'unsignednumber',
		startColor: 'color',
		startColorVar: 'colorvar',
		endColor: 'color',
		endColorVar: 'colorvar',
		radius: 'unsignednumber',
		radiusVar: 'unsignednumber',
		texture: 'texture',
		textureEnabled: 'boolean',
		textureAdditive: 'boolean',
		speed: 'number',
		speedVar: 'unsignednumber',
		angle: 'number',
		angleVar: 'unsignednumber',
		gravity: 'vector',
		radialAccel: 'number',
		radialAccelVar: 'unsignednumber',
		tangentialAccel: 'number',
		tangentialAccelVar: 'unsignednumber',
		system: 'systempicker'
	};

	this.pjs.ui.FullConfig = [{
		title: 'Predefined Systems',
		items: ['system']
	},
	{
		title: 'Basics',
		items: ['pos', 'posVar', 'life', 'lifeVar', 'totalParticles', 'emissionRate']
	},
	{
		title: 'Appearance',
		items: ['startColor', 'startColorVar', 'endColor', 'endColorVar', 'radius', 'radiusVar']
	},
	{
		title: 'Texture',
		items: ['texture', 'textureEnabled', 'textureAdditive' ]
	},
	{
		title: 'Physics',
		items: ['speed', 'speedVar', 'angle', 'angleVar', 'gravity', 'radialAccel', 'radialAccelVar', 'tangentialAccel', 'tangentialAccelVar']
	}];

})();

