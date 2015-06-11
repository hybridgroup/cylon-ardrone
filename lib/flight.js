/*
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require("cylon");

var Commands = require("./commands");

/**
 * An ARDrone Flight driver
 *
 * @constructor ardrone
 */
var Flight = module.exports = function Flight() {
  Flight.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
};

/** Subclasses the Cylon.Driver class */
Cylon.Utils.subclass(Flight, Cylon.Driver);

/**
 * Starts the ARDrone driver
 *
 * @param {Function} callback to be triggered when started
 * @return {void}
 */
Flight.prototype.start = function(callback) {
  callback();
};

/**
 * Stops the ARDrone driver
 *
 * @param {Function} callback to be triggered when halted
 * @return {void}
 */
Flight.prototype.halt = function(callback) {
  callback();
};

/**
 * Tells the drone to hover in place.
 *
 * @see stop
 * @param {Number} duration the duration to wave for
 * @return {void}
 * @publish
 */
Flight.prototype.hover = function() {
  return this.connection.stop();
};

/**
 * Makes the drone bank forwards.
 *
 *
 * @see front
 * @param {Number} speed a 0-1 value for how fast the drone moves forward
 * @return {void}
 * @publish
 */
Flight.prototype.forward = function(speed) {
  return this.connection.front(speed);
};

/**
 * Tells the drone to do as many front flips as it can in `duration`.
 *
 * @param {Number} duration the duration to do front-flips for
 * @return {void}
 * @publish
 */
Flight.prototype.frontFlip = function() {
  return this.connection.animate("flipAhead", 150);
};

/**
 * Tells the drone to do as many back flips as it can in `duration`.
 *
 * @param {Number} duration the duration to do back-flips for
 * @return {void}
 * @publish
 */
Flight.prototype.backFlip = function() {
  return this.connection.animate("flipBehind", 150);
};

/**
 * Tells the drone to do as many left flips as it can in `duration`.
 *
 * @param {Number} duration the duration to do left-flips for
 * @return {void}
 * @publish
 */
Flight.prototype.leftFlip = function() {
  return this.connection.animate("flipLeft", 150);
};

/**
 * Tells the drone to do as many right flips as it can in `duration`.
 *
 * @param {Number} duration the duration to do right-flips for
 * @return {void}
 * @publish
 */
Flight.prototype.rightFlip = function() {
  return this.connection.animate("flipRight", 150);
};

/**
 * Tells the drone to do as many waves as it can in `duration`.
 *
 * @param {Number} duration the duration to wave for
 * @return {void}
 * @publish
 */
Flight.prototype.wave = function() {
  return this.connection.animate("wave", 750);
};

/**
 * Tells the drone to perform horizontal trimming.
 *
 * @return {void}
 * @publish
 */
Flight.prototype.ftrim = function() {
  return this.connection.ftrim();
};

/**
 * Tells the drone to enter emergency mode (cut engines).
 *
 * @return {void}
 * @publish
 */
Flight.prototype.enableEmergency = function() {
  this.connection.ardrone._ref.emergency = true;
};
