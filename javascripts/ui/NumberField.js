Ext.define('pjs.ui.NumberField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjsnumber',
	layout: 'hbox',
	width: 200,

	initComponent: function() {
		this.items = [{
			itemId: 'numfield',
			xtype: 'numberfield',
			fieldLabel: this.property,
			labelAlign: 'right',
			flex: 1,
			value: this._getValue(),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
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


