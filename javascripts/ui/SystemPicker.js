(function() {
	Ext.define('pjs.ui.SystemPicker', {
		extend: 'Ext.form.field.ComboBox',

		requires: [
			'Ext.form.field.ComboBox',
			'Ext.data.Store'
		],

		alias: 'widget.pjssystempicker',

		fieldLabel: 'system',
		queryMode: 'local',
		displayField: 'name',
		valueField: 'system',

		initComponent: function() {
			this.systems = pjs.predefinedSystems;

			this.store = Ext.create('Ext.data.Store', {
				fields: ['name', 'system'],
				data: this.systems
			});

			this.callParent(arguments);

			this.on('select', this._onSelect, this);
		},

		setSystem: function(system) {
			this.setValue(system);
			this.target.reconfigure(system);
		},

		_onSelect: function(combo, records) {
			this.target.reconfigure(records[0].get('system'));
			this.fireEvent('systemchange', this, records[0].get('name'));
		}
	});
})();

