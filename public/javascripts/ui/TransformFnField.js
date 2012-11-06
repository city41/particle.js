(function() {
	var circleFn = 'return {\n' +
		'\tx: Math.cos(pjs.toRad(value.x)) * 80,\n' +
		'\ty: Math.sin(pjs.toRad(value.x)) * 80\n' +
	'};';


	Ext.define('pjs.ui.TransformFnField', {
		extend: 'pjs.ui.FieldBase',

		requires: ['Ext.panel.Panel', 'Ext.form.field.TextArea', 'Ext.button.Button'],

		alias: 'widget.pjstransformfn',
		layout: 'vbox',
		border: false,
		componentCls: 'inner-panel',

		initComponent: function() {
			this.title = this.property;
			this.items = [{
				itemId: 'fnfield',
				xtype: 'textarea',
				width: 300,
				height: 100,
				value: circleFn
			},
			{
				xtype: 'button',
				text: 'set',
				listeners: {
					click: this._onSet,
					scope: this
				}
			}];

			this.callParent(arguments);

			this.on('afterrender', function() {
				this._onSet();
			}, this);
		},

		reload: function() {
			this.down('#fnfield').setValue(circleFn);
			this._onSet();
		},

		_onSet: function() {
			var fn = this.down('#fnfield').getValue();

			var compiled;

			try {
				compiled = new Function('value', fn);
			} catch(e) {
				alert('function failed to compile');
				return;
			}

			var config = {};
			config[this.property] = compiled;

			this.target.overlay(config);
		}
	});
})();

