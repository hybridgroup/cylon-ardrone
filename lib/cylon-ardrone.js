/*
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var namespace = require('node-namespace');

require("cylon");
require('./ardrone');
require('./flight');
require('./nav');

module.exports = {
  adaptor: function(opts) {
    return new Cylon.Adaptors.ARDrone(opts);
  },

  driver: function(opts) {
    if (opts.name === 'ardrone') {
      return new Cylon.Drivers.ARDrone.Flight(opts);
    } else if (opts.name === 'ardroneNav') {
      return new Cylon.Drivers.ARDrone.Nav(opts);
    }
  },

  register: function(robot) {
    Logger.debug("Registering ARDrone adaptor and drivers for " + robot.name);
    robot.registerAdaptor('cylon-ardrone', 'ardrone');

    robot.registerDriver('cylon-ardrone', 'ardrone');
    robot.registerDriver('cylon-ardrone', 'ardroneNav');
  }
};
