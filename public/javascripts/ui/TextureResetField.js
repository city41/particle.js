Ext.define('pjs.ui.TextureResetField', {
	extend: 'Ext.container.Container',

	requires: [
		'Ext.container.Container',
		'Ext.button.Button'
	],

	alias: 'widget.pjstexturereset',
	layout: 'hbox',

	initComponent: function() {
		this.callParent(arguments);

		var button = this.add({
			xtype: 'button',
			text: 'reset texture',
			width: 180
		});

		button.on('click', this._resetTexture, this);
	},

	_resetTexture: function() {
		var config = {};
		config[this.property] = pjs.defaultTexture;

		this.target.overlay(config);
	}
});
	
