/*
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  require('./cylon-ardrone');

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Drivers.ARDrone", function() {
    return this.Flight = (function(_super) {
      __extends(Flight, _super);

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
        var args, _ref;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return (_ref = this.connection).front.apply(_ref, args);
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

}).call(this);
