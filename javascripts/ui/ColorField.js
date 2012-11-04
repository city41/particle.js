Ext.define('pjs.ui.ColorField', {
	extend: 'pjs.ui.FieldBase',

	requires: [
		'pjs.ui.FieldBase',
		'Ext.form.field.Number'
	],

	alias: 'widget.pjscolor',
	layout: 'hbox',

	defaults: {
		xtype: 'numberfield',
		labelWidth: 17,
		labelAlign: 'right',
		minValue: 0,
		maxValue: 255,
		width: 75
	},

	initComponent: function() {
		this.items = [{
			itemId: 'rfield',
			fieldLabel: this.property + ' r:',
			labelWidth: 90,
			width: this.defaults.width + 70,
			value: this._getValue('r'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'gfield',
			fieldLabel: 'g:',
			value: this._getValue('g'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'bfield',
			fieldLabel: 'b:',
			value: this._getValue('b'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'afield',
			fieldLabel: 'a:',
			value: this._getValue('a'),
			minValue: 0,
			maxValue: 1,
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	reload: function() {
		this.reloading = true;
		this.down('#rfield').setValue(this._getValue('r'));
		this.down('#gfield').setValue(this._getValue('g'));
		this.down('#bfield').setValue(this._getValue('b'));
		this.down('#afield').setValue(this._getValue('a'));
		this.reloading = false;
	},

	_getValue: function(property) {
		var nameIndex = ['r', 'g', 'b', 'a'];
		var index = nameIndex.indexOf(property);
		var multiplier = property === 'a' ? 1 : 255;

		return this.target[this.property][index] * multiplier;
	},

	_onChange: function() {
		if(this.reloading) {
			return;
		}

		var r = this.down('#rfield').getValue();
		var g = this.down('#gfield').getValue();
		var b = this.down('#bfield').getValue();
		var a = this.down('#afield').getValue();

		var config = {};
		config[this.property] = [
			r/255,
			g/255,
			b/255,
			a
		];

		this.target.overlay(config);
	}
});


