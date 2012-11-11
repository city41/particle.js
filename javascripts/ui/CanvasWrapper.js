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
			}
		}, {
			xtype: 'container',
			layout: 'column',
			width: this.canvas.width,
			defaults: {
				margin: 3
			},
			items: [{
				xtype: 'button',
				itemId: 'playbutton',
				columnWidth: 0.25,
				text: this.controller.isPaused() ? 'Play' : 'Pause',
				listeners: {
					click: this._onPlayClick,
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

		Ext.fly(this.canvas).on('mouseup', this._onCanvasMouseUp, this);
		Ext.fly(this.canvas).setStyle('cursor', 'crosshair');

		this.reload();
	},

	reload: function() {
		this._setButtonText(this.down('#playbutton'));
	},

	_onCanvasMouseUp: function(e, canvas) {
		this.particleSystem.overlay({
			pos: {
				x: e.getX(),
				y: e.getY()
			}
		});
	},

	_onPlayClick: function(button) {
		this.controller.togglePause();
		this._setButtonText(button);
	},

	_setButtonText: function(button) {
		if(this.controller.isPaused()) {
			button.setText('Play');
		} else {
			button.setText('Pause');
		}
	},

	_onResetClick: function() {
		this.fireEvent('reset', this);
	}
});

