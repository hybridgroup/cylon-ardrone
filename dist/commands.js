/*
 * Cylonjs ARDrone commands
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  var namespace;

  namespace = require('node-namespace');

  namespace("Cylon.Adaptor", function() {
    return this.Commands = ['takeoff', 'land', 'stop', 'up', 'down', 'left', 'right', 'front', 'back', 'clockwise', 'counterClockwise', 'calibrate', 'config', 'animate', 'animateLeds', 'disableEmergency'];
  });

}).call(this);
