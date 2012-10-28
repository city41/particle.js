Ext.define('pjs.ui.ColorField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjscolor',
	layout: 'hbox',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			html: this.property,
			width: 100
		}, {
			itemId: 'rfield',
			xtype: 'numberfield',
			fieldLabel: 'r:',
			value: this._getValue('r'),
			minValue: 0,
			maxValue: 255,
			listeners: {
				change: this._onChange,
				scope: this
			}
		},
		{
			itemId: 'gfield',
			xtype: 'numberfield',
			fieldLabel: 'g:',
			value: this._getValue('g'),
			minValue: 0,
			maxValue: 255,
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'bfield',
			xtype: 'numberfield',
			fieldLabel: 'b:',
			value: this._getValue('b'),
			minValue: 0,
			maxValue: 255,
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'afield',
			xtype: 'numberfield',
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

	_getValue: function(property) {
		var nameIndex = ['r', 'g', 'b', 'a'];
		var index = nameIndex.indexOf(property);
		var multiplier = property === 'a' ? 1 : 255;

		return this.target[this.property][index] * multiplier;
	},

	_onChange: function() {
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


