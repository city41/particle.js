(function() {
	this.pjs = this.pjs || {};
	this.pjs.ui = this.pjs.ui || {};

	this.pjs.ui.FullConfig = [{
		title: 'Predefined Systems',
		items: [{
			type: 'systempicker'
		}]
	},
	{
		title: 'Basics',
		items: [{
			type: 'posvector',
			property: 'pos'
		},
		{
			type: 'posvector',
			property: 'posVar'
		},
		{
			type: 'unsignednumber',
			property: 'life'
		},
		{
			type: 'unsignednumber',
			property: 'lifeVar'
		},
		{
			type: 'unsignednumber',
			property: 'totalParticles'
		},
		{
			type: 'unsignednumber',
			property: 'emissionRate'
		}]
	},
	{
		title: 'Appearance',
		items: [{
			type: 'color',
			property: 'startColor'
		},
		{
			type: 'colorvar',
			property: 'startColorVar'
		},
		{
			type: 'color',
			property: 'endColor'
		},
		{
			type: 'colorvar',
			property: 'endColorVar'
		},
		{
			type: 'unsignednumber',
			property: 'radius'
		},
		{
			type: 'unsignednumber',
			property: 'radiusVar'
		}]
	},
	{
		title: 'Texture',
		items: [{
			type: 'texture',
			property: 'texture'
		},
		{
			type: 'boolean',
			property: 'textureEnabled'
		},
		{
			type: 'boolean',
			property: 'textureAdditive'
		},
		{
			type: 'texturereset',
			property: 'texture'
		}]
	},
	{
		title: 'Physics',
		items: [{
			type: 'number',
			property: 'speed'
		},
		{
			type: 'unsignednumber',
			property: 'speedVar'
		},
		{
			type: 'number',
			property: 'angle'
		},
		{
			type: 'unsignednumber',
			property: 'angleVar'
		},
		{
			type: 'vector',
			property: 'gravity'
		},
		{
			type: 'number',
			property: 'radialAccel'
		},
		{
			type: 'unsignednumber',
			property: 'radialAccelVar'
		},
		{
			type: 'number',
			property: 'tangentialAccel'
		},
		{
			type: 'unsignednumber',
			property: 'tangentialAccelVar'
		}]
	}];

})();

