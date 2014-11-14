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

  opts = opts || {};

  this.ardrone = this.connector = null;
  this.commands = Commands;

  this.ip = opts.host || opts.port || "192.168.1.1"
};

Cylon.Utils.subclass(ARDrone, Cylon.Adaptor);

ARDrone.prototype.connect = function(callback) {
  this.connector = this.ardrone = new LibARDrone.createClient({
    ip: this.ip
  });

  this.proxyMethods(Commands, this.ardrone, this);

  var events = [
    'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
    'lowBattery', 'batteryChange', 'altitudeChange'
  ];

  events.forEach(function(name) {
    this.defineAdaptorEvent(name);
  }.bind(this));

  callback();
};

ARDrone.prototype.disconnect = function(callback) {
  callback();
}
