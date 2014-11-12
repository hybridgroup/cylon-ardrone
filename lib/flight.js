/*
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var Cylon = require('cylon');

var Commands = require('./commands');

var Flight = module.exports = function Flight() {
  Flight.__super__.constructor.apply(this, arguments);
  this.setupCommands(Commands);
};

Cylon.Utils.subclass(Flight, Cylon.Driver);

Flight.prototype.start = function(callback) {
  callback();
};

Flight.prototype.halt = function(callback) {
  callback();
};

Flight.prototype.hover = function() {
  return this.adaptor.stop();
};

// Public: Moves the drone forward by a specified interval (0-1)
//
// speed - integer speed drone should move forward (0-1)
//
// Examples
//
//     my.drone.forward(1)
//
// Returns nothing
Flight.prototype.forward = function(speed) {
  return this.adaptor.front(speed);
};

// Public: Makes the drone do a front-flip
//
// Examples
//
//     my.drone.frontflip()
//
// Returns nothing
Flight.prototype.frontFlip = function() {
  return this.adaptor.animate('flipAhead', 150);
};

// Public: Makes the drone do a back-flip
//
// Examples
//
//     my.drone.backflip()
//
// Returns nothing
Flight.prototype.backFlip = function() {
  return this.adaptor.animate('flipBehind', 150);
};

// Public: Makes the drone do a left-flip
//
// Examples
//
//     my.drone.leftflip()
//
// Returns nothing
Flight.prototype.leftFlip = function() {
  return this.adaptor.animate('flipLeft', 150);
};

// Public: Makes the drone do a right-flip
//
// Examples
//
//     my.drone.rightflip()
//
// Returns nothing
Flight.prototype.rightFlip = function() {
  return this.adaptor.animate('flipRight', 150);
};

// Public: Makes the drone wave
//
// Examples
//
//     my.drone.wave()
//
// Returns nothing
Flight.prototype.wave = function() {
  return this.adaptor.animate('wave', 750);
};
