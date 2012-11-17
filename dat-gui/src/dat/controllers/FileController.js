/**
 * dat-gui JavaScript Controller Library
 * http://code.google.com/p/dat-gui
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

define([
    'dat/controllers/Controller',
    'dat/dom/dom',
    'dat/utils/common'
], function(Controller, dom, common) {

  /**
   * @class Provides a file input to alter the file property of an object.
   *
   * @extends dat.controllers.Controller
   *
   * @param {Object} object The object to be manipulated
   * @param {string} property The name of the property to be manipulated
   *
   * @member dat.controllers
   */
  var FileController = function(object, property) {

    FileController.superclass.call(this, object, property);

    var _this = this;

    this.__input = document.createElement('input');
    this.__input.setAttribute('type', 'file');

    dom.bind(this.__input, 'change', onChange);

    function onChange() {
      _this.setValue(_this.__input.files[0]);
    }

    this.updateDisplay();

    this.domElement.appendChild(this.__input);
  };

  FileController.superclass = Controller;

  common.extend(
      FileController.prototype,
      Controller.prototype
  );

  return FileController;
});

