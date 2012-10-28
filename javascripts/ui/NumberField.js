Ext.define('pjs.ui.NumberField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjsnumber',
	layout: 'hbox',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			html: this.property,
			width: 100
		}, {
			itemId: 'numfield',
			xtype: 'numberfield',
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


