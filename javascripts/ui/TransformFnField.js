Ext.define('pjs.ui.TransformFnField', {
	extend: 'Ext.panel.Panel',

	requires: [
		'Ext.panel.Panel',
		'Ext.form.field.TextArea',
		'Ext.button.Button'
	],

	alias: 'widget.pjstransformfn',
	layout: 'vbox',
	collapsible: true,
	collapsed: true,
	collapseFirst: true,
	border: false,
	componentCls: 'inner-panel',

	initComponent: function() {
		this.title = this.property;
		this.items = [{
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



