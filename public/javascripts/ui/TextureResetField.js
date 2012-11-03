Ext.define('pjs.ui.TextureResetField', {
	extend: 'Ext.container.Container',
	alias: 'widget.pjstexturereset',
	layout: 'hbox',

	initComponent: function() {
		this.callParent(arguments);

		var button = this.add({
			xtype: 'button',
			text: 'reset',
			width: 100
		});

		button.on('click', this._resetTexture, this);
	},

	_resetTexture: function() {
		pjs.ui.TextureLoader.load(this.target, this.property, 'particle.png');
	}
});
	
