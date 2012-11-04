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
			width: this.canvas.width + 10,
			height: this.canvas.height + 10,
			style: {
				backgroundColor: 'black'
			}
		}, {
			xtype: 'container',
			layout: 'column',
			width: this.canvas.width + 10,
			items: [{
				xtype: 'button',
				columnWidth: 0.33,
				text: this.particleSystem.active ? 'Pause' : 'Play',
				listeners: {
					click: this._onClick,
					scope: this
				}
			},{
				xtype: 'button',
				columnWidth: 0.33,
				text: 'Reset',
				listeners: {
					click: this._onResetClick,
					scope: this
				}
			}, {
				xtype: 'container',
				itemId: 'fpsContainer',
				html: '-- fps',
				columnWidth: 0.33,
				style: {
					textAlign: 'right',
					marginRight: '20px'
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
		window.location.href = window.location.href;
	}
});

