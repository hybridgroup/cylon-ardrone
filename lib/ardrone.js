/*
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var LibARDrone = require('ar-drone'),
    Cylon = require('cylon');

var Commands = require('./commands');

var ARDrone = module.exports = function ARDrone(opts) {
  ARDrone.__super__.constructor.apply(this, arguments);

  this.ardrone = null;
  this.connector = null;
  this.myself = this;
};

subclass(ARDrone, Cylon.Adaptor);

ARDrone.prototype.commands = function() {
  return Commands;
};

ARDrone.prototype.connect = function(callback) {
  this.ardrone = new LibARDrone.createClient({
    ip: this.connection.port
  });

  this.connector = this.ardrone;
  this.proxyMethods(Commands, this.ardrone, this.myself);

  var events = [
    'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
    'lowBattery', 'batteryChange', 'altitudeChange'
  ];

  for (var i = 0; i < events.length; i++) {
    this.defineAdaptorEvent({ eventName: events[i] });
  }

  return ARDrone.__super__.connect.apply(this, arguments);
};
