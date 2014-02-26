/*
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-ardrone');
require('./commands');

var LibARDrone = require('ar-drone'),
    namespace = require('node-namespace');

namespace("Cylon.Adaptors", function() {
  this.ARDrone = (function(klass) {
    subclass(ARDrone, klass);

    function ARDrone(opts) {
      ARDrone.__super__.constructor.apply(this, arguments);

      this.ardrone = null;
      this.connector = null;
      this.myself = this;
    }

    ARDrone.prototype.commands = function() {
      return Cylon.ARDrone.Commands;
    };

    ARDrone.prototype.connect = function(callback) {
      this.ardrone = new LibARDrone.createClient({
        ip: this.connection.port.toString()
      });

      this.connector = this.ardrone;
      this.proxyMethods(Cylon.ARDrone.Commands, this.ardrone, this.myself);

      var events = [
        'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
        'lowBattery', 'batteryChange', 'altitudeChange'
      ];

      for (var i = 0; i < events.length; i++) {
        this.defineAdaptorEvent({ eventName: events[i] });
      }

      return ARDrone.__super__.connect.apply(this, arguments);
    };

    return ARDrone;

  })(Cylon.Adaptor);
});

module.exports = Cylon.Adaptors.ARDrone;
