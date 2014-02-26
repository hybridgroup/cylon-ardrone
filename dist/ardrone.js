/*
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var LibARDrone, namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  require('./cylon-ardrone');

  LibARDrone = require('ar-drone');

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Adaptors", function() {
    return this.ARDrone = (function(_super) {
      __extends(ARDrone, _super);

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
        var event, events, _i, _len;
        this.ardrone = new LibARDrone.createClient({
          ip: this.connection.port.toString()
        });
        this.connector = this.ardrone;
        this.proxyMethods(Cylon.ARDrone.Commands, this.ardrone, this.myself);
        events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying', 'lowBattery', 'batteryChange', 'altitudeChange'];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          this.defineAdaptorEvent({
            eventName: event
          });
        }
        return ARDrone.__super__.connect.apply(this, arguments);
      };

      return ARDrone;

    })(Cylon.Adaptor);
  });

  module.exports = Cylon.Adaptors.ARDrone;

}).call(this);
