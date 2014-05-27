/*
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

'use strict';

var Cylon = require('cylon');

var ARDrone = require('./ardrone');

var Flight = require('./flight'),
    Nav = require('./nav');

module.exports = {
  adaptor: function(opts) {
    return new ARDrone(opts);
  },

  driver: function(opts) {
    if (opts == null) {
      opts = {};
    }

    switch (opts.name) {
      case 'ardrone':
        return new Flight(opts);
        break;

      case 'ardroneNav':
        return new Nav(opts);
        break;

      default:
        return null;
    }
  },

  register: function(robot) {
    Cylon.Logger.debug("Registering ARDrone adaptor and drivers for " + robot.name);

    robot.registerAdaptor('cylon-ardrone', 'ardrone');

    robot.registerDriver('cylon-ardrone', 'ardrone');
    robot.registerDriver('cylon-ardrone', 'ardroneNav');
  }
};
