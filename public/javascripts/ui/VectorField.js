Ext.define('pjs.ui.VectorField', {
	extend: 'pjs.ui.FieldBase',
	alias: 'widget.pjsvector',
	layout: 'hbox',

	defaults: {
		xtype: 'numberfield',
		labelWidth: 20,
		labelAlign: 'right',
		width: 90
	},

	initComponent: function() {
		this.items = [{
			itemId: 'xfield',
			fieldLabel: this.property + ' x:',
			labelWidth: 100,
			width: this.defaults.width + 100,
			value: this._getValue('x'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}, {
			itemId: 'yfield',
			fieldLabel: 'y:',
			value: this._getValue('y'),
			listeners: {
				change: this._onChange,
				scope: this
			}
		}];

		this.callParent(arguments);
	},

	reload: function() {
		this.reloading = true;
		this.down('#xfield').setValue(this._getValue('x'));
		this.down('#yfield').setValue(this._getValue('y'));
		this.reloading = false;
	},

	_getValue: function(property) {
		return this.target[this.property][property];
	},

	_onChange: function() {
		if(this.reloading) {
			return;
		}

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

