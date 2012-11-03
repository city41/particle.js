(function() {
	Ext.define('pjs.ui.SystemPicker', {
		extend: 'Ext.form.field.ComboBox',
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

			this.setValue(this.systems[0].name);
			this.target.reconfigure(this.systems[0].system);
		},

		_onSelect: function(combo, records) {
			this.target.reconfigure(records[0].get('system'));
			this.fireEvent('systemchange', this, records[0].get('name'));
		}
	});
})();

