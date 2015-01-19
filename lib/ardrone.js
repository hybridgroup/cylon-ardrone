/*
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var LibARDrone = require("ar-drone"),
    Cylon = require("cylon");

var Commands = require("./commands");

var events = [
  /**
   * Emitted when the ARDrone has new navigation data
   *
   * @event navdata
   */
  "navdata",

  /**
   * Emitted when the ARDrone is landing
   *
   * @event landing
   */
  "landing",

  /**
   * Emitted when the ARDrone has landed
   *
   * @event landed
   */
  "landed",

  /**
   * Emitted when the ARDrone has taken off
   *
   * @event takeoff
   */
  "takeoff",

  /**
   * Emitted when the ARDrone is hovering
   *
   * @event hovering
   */
  "hovering",

  /**
   * Emitted when the ARDrone is flying
   *
   * @event flying
   */
  "flying",

  /**
   * Emitted when the ARDrone has a low battery
   *
   * @event lowBattery
   */
  "lowBattery",

  /**
   * Emitted when the ARDrone"s battery percentage has changed
   *
   * @event batteryChange
   */
  "batteryChange",

  /**
   * Emitted when the ARDrone"s altitude has changed
   *
   * @event altitudeChange
   */
  "altitudeChange"
];

/**
 * An ARDrone adaptor
 *
 * @constructor ardrone
 *
 * @param {Object} opts
 * @param {String=} opts.host IP address of the ARDrone
 */
var ARDrone = module.exports = function ARDrone(opts) {
  ARDrone.__super__.constructor.apply(this, arguments);
  opts = opts || {};

  this.ip = opts.host || opts.port || "192.168.1.1";

  this.connector = this.ardrone = null;

  this.events = events;
};

/** Subclasses the Cylon.Adaptor class */
Cylon.Utils.subclass(ARDrone, Cylon.Adaptor);

/**
 * Connects to the ARDrone
 *
 * @param {Function} callback to be triggered when connected
 * @return {null}
 */
ARDrone.prototype.connect = function(callback) {
  this.connector = this.ardrone = new LibARDrone.createClient({
    ip: this.ip
  });

  this.proxyMethods(Commands, this.ardrone, this);

  this.events.forEach(function(name) {
    this.defineAdaptorEvent(name);
  }.bind(this));

  callback();
};

/**
 * Disconnects from the ARDrone
 *
 * @param {Function} callback to be triggered when disconnected
 * @return {null}
 */
ARDrone.prototype.disconnect = function(callback) {
  callback();
};
