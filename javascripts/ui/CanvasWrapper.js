Ext.define('pjs.ui.CanvasWrapper', {
	extend: 'Ext.container.Container',

	requires: [
		'Ext.container.Container',
		'Ext.button.Button'
	],

	layout: 'vbox',
	alias: 'widget.pjscanvaswrapper',

	initComponent: function() {
		this.items = [{
			xtype: 'container',
			itemId: 'canvasWrapper',
			width: this.canvas.width,
			height: this.canvas.height,
			style: {
				backgroundColor: 'black',
				marginRight: '5px'
			},
		}, {
			xtype: 'container',
			layout: 'column',
			width: this.canvas.width,
			defaults: {
				margin: 3
			},
			items: [{
				xtype: 'button',
				columnWidth: 0.25,
				text: this.particleSystem.active ? 'Pause' : 'Play',
				listeners: {
					click: this._onClick,
					scope: this
				}
			},{
				xtype: 'button',
				columnWidth: 0.25,
				text: 'Reset',
				listeners: {
					click: this._onResetClick,
					scope: this
				}
			}, {
				xtype: 'container',
				itemId: 'fpsContainer',
				html: '-- fps',
				columnWidth: 0.5,
				style: {
					textAlign: 'right'
				}
			}]
		}];

		this.callParent(arguments);
	},

	afterRender: function() {
		this.callParent(arguments);

		var el = this.down('#canvasWrapper').getEl().dom;
		el.appendChild(this.canvas);

		this.fpsEl = this.down('#fpsContainer').getEl().dom;
		this.particleSystem.setFpsContainer(this.fpsEl);
	},

	_onClick: function(button) {
		this.particleSystem.active = !this.particleSystem.active;

		if(this.particleSystem.active) {
			button.setText('Pause');
		} else {
			button.setText('Play');
			this.fpsEl.innerHTML = '-- fps';
		}
	},

	_onResetClick: function() {
		this.particleSystem.reconfigure(this.chosenSystem);
	}
});

