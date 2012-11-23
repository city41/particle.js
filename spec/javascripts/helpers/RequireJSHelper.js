(function(){
  // save references to the original global functions
  var _it = window.it;
  var _describe = window.describe;

  // override the global `it` function
  window.it = function(description, depsOrTestFn, testFn){
    // the middle argument here represents either the dependency list or the actual spec definition

    if(arguments.length === 1) {
      // call the original pending spec method
      window.xit.call(this, description);
    } else if(arguments.length === 3) {
      // use our fancy new RequireJS method

      // we actually still use the old method, but setup some conditions before our real spec runs
      _it(description, function() {
        jasmineContext = this;
        var readyModules = [];
        
        // here we wait for our modules to be required before continuing
        waitsFor(function() {
          require(depsOrTestFn, function() {
            readyModules = arguments;
          });
          return readyModules.length === depsOrTestFn.length;
        });

        // now that our modules are loaded, we can pass them along to the original spec definition
        runs(function() {
          var arrayOfModules;
          arrayOfModules = Array.prototype.slice.call(readyModules);
          testFn.apply(jasmineContext, arrayOfModules);
        });
      });
    } else {
      // if we only have 2 arguments, just use the old functionality
      _it.apply(this, [description, depsOrTestFn]);
    }
  };

  // save a reference to the current window.onload (jasmine suite runner)
  window._onload = window.onload;

  // stub out the call so that we can wait for our specs to be registered
  window.onload = function(){};

  // set up a counter so that we know when we're done registering
  window._describeCount = 0;

  // override the global `describe` method
  window.describe = function(description, depsOrTestFn, testFn) {
    if(arguments.length === 1) {
      // same deal, call the pending describe method if we have 1 argument
      window.xdescribe.call(this, description);
    } else if(arguments.length === 3) {
      // immediately increase our counter
      _describeCount++;
      var readyModules = [];

      // require our modules
      require(depsOrTestFn, function() {
        readyModules = arguments;

        // call the original method
        // this works different from our it method because
        //   we can't use waitsFor in this context
        _describe(description, function(){
          testFn.apply(this, readyModules);

          //descrease our counter once we'ved registered this describe block
          _describeCount--;
        });

        // if we're done, call the original onload (which runs the jasmine suite)
        if(_describeCount <= 0) {
          _onload();
        }
      });
    } else {
      // otherwise call the original describe
      _describe.call(this, description, depsOrTestFn);
    }
  };
})();
