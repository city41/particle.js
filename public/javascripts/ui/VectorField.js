Ext.define('pjs.ui.VectorField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjsvector',
	layout: 'hbox',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			html: this.property,
			width: 100
		}, {
			itemId: 'xfield',
			xtype: 'numberfield',
			fieldLabel: 'x:',
			value: this._getValue('x'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		},
		{
			itemId: 'yfield',
			xtype: 'numberfield',
			fieldLabel: 'y:',
			value: this._getValue('y'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	_getValue: function(property) {
		return this.target[this.property][property];
	},

	_onChange: function() {
		var x = this.down('#xfield').getValue();
		var y = this.down('#yfield').getValue();

		var config = {};
		config[this.property] = {
			x: x,
			y: y
		};

		this.target.overlay(config);
	}
});

