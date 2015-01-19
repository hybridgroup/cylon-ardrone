/*
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

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
 * An ARDrone Nav driver
 *
 * @constructor ardrone-nav
 */
var Nav = module.exports = function Nav() {
  Nav.__super__.constructor.apply(this, arguments);

  this.events = events;
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Nav, Cylon.Driver);

/**
 * Starts the driver
 *
 * @param {Function} callback to be triggered when started
 * @return {null}
 */
Nav.prototype.start = function(callback) {
  this.events.forEach(function(e) {
    this.defineDriverEvent({ eventName: e });
  }.bind(this));

  callback();
};

/**
 * Stops the driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {null}
 */
Nav.prototype.halt = function(callback) {
  callback();
};
