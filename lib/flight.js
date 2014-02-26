/*
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

require('./cylon-ardrone');

var namespace = require('node-namespace');

require('./commands');

namespace("Cylon.Drivers.ARDrone", function() {
  this.Flight = (function(klass) {
    subclass(Flight, klass);

    function Flight(opts) {
      Flight.__super__.constructor.apply(this, arguments);
      this.proxyMethods(Cylon.ARDrone.Commands, this.connection, this);
    }

    Flight.prototype.commands = function() {
      return Cylon.ARDrone.Commands;
    };

    Flight.prototype.hover = function() {
      return this.connection.stop();
    };

    Flight.prototype.forward = function() {
      var args = arguments.length >= 1 ? arguments.slice(0) : [];
      return this.connection.front.apply(this.connection, args);
    };

    Flight.prototype.frontFlip = function() {
      return this.connection.animate('flipAhead', 150);
    };

    Flight.prototype.backFlip = function() {
      return this.connection.animate('flipBehind', 150);
    };

    Flight.prototype.leftFlip = function() {
      return this.connection.animate('flipLeft', 150);
    };

    Flight.prototype.rightFlip = function() {
      return this.connection.animate('flipRight', 150);
    };

    Flight.prototype.wave = function() {
      return this.connection.animate('wave', 750);
    };

    return Flight;

  })(Cylon.Driver);
});

module.exports = Cylon.Drivers.ARDrone.Flight;
