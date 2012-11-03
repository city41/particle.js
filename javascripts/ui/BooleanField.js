Ext.define('pjs.ui.BooleanField', {
	extend: 'pjs.ui.FieldBase',
	alias: 'widget.pjsboolean',
	layout: 'hbox',
	width: 100,

	initComponent: function() {
		this.items = [{
			itemId: 'boolfield',
			xtype: 'checkbox',
			fieldLabel: this.property,
			labelAlign: 'right',
			width: 200,
			checked: this._getValue(),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	reload: function() {
		this.down('#boolfield').setValue(this._getValue());
	},

	_getValue: function(property) {
		return this.target[this.property];
	},

	_onChange: function() {
		var bool = this.down('#boolfield').getValue();

		var config = {};
		config[this.property] = !!bool;

		this.target.overlay(config);
	}
});



