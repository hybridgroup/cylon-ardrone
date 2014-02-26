/*
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

require('./cylon-ardrone');
require('./commands');

var namespace = require('node-namespace');

namespace("Cylon.Drivers.ARDrone", function() {
  this.Nav = (function(klass) {
    subclass(Nav, klass);

    function Nav() {
      Nav.__super__.constructor.apply(this, arguments);
    }

    Nav.prototype.start = function(callback) {
      Logger.debug("ARDrone nav started");

      var events = [
        'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
        'lowBattery', 'batteryChange', 'altitudeChange', 'update'
      ];

      for (var i = 0; i < events.length; i++) {
        this.defineDriverEvent({ eventName: events[i] });
      }

      return Nav.__super__.start.apply(this, arguments);
    };

    return Nav;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.ARDrone.Nav;
