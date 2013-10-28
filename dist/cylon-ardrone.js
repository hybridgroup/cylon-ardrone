/*
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var __slice = [].slice;

  require('./ardrone');

  module.exports = {
    adaptor: function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return (function(func, args, ctor) {
        ctor.prototype = func.prototype;
        var child = new ctor, result = func.apply(child, args);
        return Object(result) === result ? result : child;
      })(Cylon.Adaptor.ARDrone, args, function(){});
    },
    driver: function(opts) {
      if (opts.name === 'ardrone') {
        return new Cylon.Driver.ARDrone(opts);
      }
    },
    register: function(robot) {
      Logger.debug("Registering ARDrone adaptor and drivers for " + robot.name);
      robot.registerAdaptor('cylon-ardrone', 'ardrone');
      return robot.registerDriver('cylon-ardrone', 'ardrone');
    }
  };

}).call(this);
