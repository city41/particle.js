define(['dat/controllers/Controller', 'dat/dom/dom', 'dat/utils/common'], function(Controller, dom, common) {

	var TextAreaController = function(object, property) {
		TextAreaController.superclass.call(this, object, property);

		var _this = this;

		this.__textarea = document.createElement('textarea');
		this.__textarea.setAttribute('rows', 5);
		this.__textarea.setAttribute('cols', 18);

		dom.bind(this.__textarea, 'keyup', onChange);
		dom.bind(this.__textarea, 'change', onChange);
		dom.bind(this.__textarea, 'blur', onBlur);

		function onChange() {
			_this.setValue(_this.__textarea.value);
		}

		function onBlur() {
			if (_this.__onFinishChange) {
				_this.__onFinishChange.call(_this, _this.getValue());
			}
		}
	
		this.updateDisplay();

		this.domElement.appendChild(this.__textarea);

		this.additionalClasses = 'textarea';
	}

	TextAreaController.superclass = Controller;

	common.extend(TextAreaController.prototype, Controller.prototype, {
		updateDisplay: function() {
			// Stops the caret from moving on account of:
			// keyup -> setValue -> updateDisplay
			if (!dom.isActive(this.__textarea)) {
				this.__textarea.value = this.getValue();
			}
			return TextAreaController.superclass.prototype.updateDisplay.call(this);
		}
	});

	return TextAreaController;
});

