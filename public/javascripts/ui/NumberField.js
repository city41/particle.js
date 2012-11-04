Ext.define('pjs.ui.NumberField', {
	extend: 'pjs.ui.FieldBase',

	requires: [
		'pjs.ui.FieldBase',
		'Ext.form.field.Number'
	],

	alias: 'widget.pjsnumber',
	layout: 'hbox',
	width: 100,

	initComponent: function() {
		this.items = [{
			itemId: 'numfield',
			xtype: 'numberfield',
			fieldLabel: this.property,
			labelAlign: 'right',
			width: 200,
			value: this._getValue(),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	reload: function() {
		this.down('#numfield').setValue(this._getValue());
	},

	_getValue: function(property) {
		return this.target[this.property];
	},

	_onChange: function() {
		var num = this.down('#numfield').getValue();

		var config = {};
		config[this.property] = num;

		this.target.overlay(config);
	}
});


