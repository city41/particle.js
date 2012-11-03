(function() {
	var systems = [{
		name: 'green flame',
		system: {
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
			startColor: [0.25, 1, 0, 0.8],
			endColor: [0, 0, 0, 0],
			active: true,
			duration: Infinity
		}
	}, {
		name: 'red flame',
		system: {
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
			startColor: [1, 0.5, 0, 0.8],
			endColor: [0, 0, 0, 0],
			active: true,
			duration: Infinity
		}
	}];

	Ext.define('pjs.ui.SystemPicker', {
		extend: 'Ext.form.field.ComboBox',
		alias: 'widget.pjssystempicker',

		fieldLabel: 'system',
		queryMode: 'local',
		displayField: 'name',
		valueField: 'system',

		initComponent: function() {
			this.store = Ext.create('Ext.data.Store', {
				fields: ['name', 'system'],
				data: systems
			});

			this.callParent(arguments);

			this.on('select', this._onSelect, this);
		},

		_onSelect: function(combo, records) {
			this.target.overlay(records[0].get('system'));
		}
	});
})();

