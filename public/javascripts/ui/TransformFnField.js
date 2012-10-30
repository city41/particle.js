Ext.define('pjs.ui.TransformFnField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjstransformfn',
	layout: 'hbox',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			html: this.property,
			width: 100
		}, {
			itemId: 'fnfield',
			xtype: 'textarea',
			width: 300,
			height: 100,
			value: '' //this._getValue(),
		}, {
			xtype: 'button',
			text: 'set',
			listeners: {
				click: this._onSet,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	_getValue: function(property) {
		return this.target[this.property];
	},

	_onSet: function() {
		var fn = this.down('#fnfield').getValue();

		var config = {};
		config[this.property] = new Function("value", fn);

		this.target.overlay(config);
	}
});



