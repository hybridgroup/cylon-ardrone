/*
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var Nav = module.exports = function Nav() {
  Nav.__super__.constructor.apply(this, arguments);
};

Cylon.Utils.subclass(Nav, Cylon.Driver);

// Public: Starts the driver
//
// Returns null
Nav.prototype.start = function(callback) {
  Cylon.Logger.debug("ARDrone nav started");

  var events = [
    'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
    'lowBattery', 'batteryChange', 'altitudeChange', 'update'
  ];

  for (var i = 0; i < events.length; i++) {
    this.defineDriverEvent({ eventName: events[i] });
  }

  return Nav.__super__.start.apply(this, arguments);
};
