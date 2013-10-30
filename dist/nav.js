/*
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Driver.ARDrone", function() {
    return this.Nav = (function(_super) {
      __extends(Nav, _super);

      function Nav(opts) {
        Nav.__super__.constructor.apply(this, arguments);
        this.device = opts.device;
        this.connection = this.device.connection;
      }

      Nav.prototype.commands = function() {
        return [];
      };

      Nav.prototype.start = function(callback) {
        var _this = this;
        Logger.debug("ARDrone nav started");
        this.connection.on('navdata', function(data) {
          _this.device.emit('update', 'navdata', data);
          return _this.device.emit('navdata', data);
        });
        this.connection.on('landing', function() {
          _this.device.emit('update', 'landing');
          return _this.device.emit('landing');
        });
        this.connection.on('landed', function() {
          _this.device.emit('update', 'landed');
          return _this.device.emit('landed');
        });
        this.connection.on('takeoff', function() {
          _this.device.emit('update', 'takeoff');
          return _this.device.emit('takeoff');
        });
        this.connection.on('hovering', function() {
          _this.device.emit('update', 'hovering');
          return _this.device.emit('hovering');
        });
        this.connection.on('flying', function() {
          _this.device.emit('update', 'flying');
          return _this.device.emit('flying');
        });
        this.connection.on('lowBattery', function(battery) {
          _this.device.emit('update', 'lowBattery', battery);
          return _this.device.emit('lowBattery', battery);
        });
        this.connection.on('batteryChange', function(battery) {
          _this.device.emit('update', 'batteryChange', battery);
          return _this.device.emit('batteryChange', battery);
        });
        this.connection.on('altitudeChange', function(altitude) {
          _this.device.emit('update', 'altitudeChange', altitude);
          return _this.device.emit('altitudeChange', altitude);
        });
        callback(null);
        return this.device.emit('start');
      };

      return Nav;

    })(Cylon.Basestar);
  });

}).call(this);
