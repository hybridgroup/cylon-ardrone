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
        Logger.debug("ARDrone nav started");
        this.defineDriverEvent({
          eventName: 'navdata'
        });
        this.defineDriverEvent({
          eventName: 'landing'
        });
        this.defineDriverEvent({
          eventName: 'landed'
        });
        this.defineDriverEvent({
          eventName: 'takeoff'
        });
        this.defineDriverEvent({
          eventName: 'hovering'
        });
        this.defineDriverEvent({
          eventName: 'flying'
        });
        this.defineDriverEvent({
          eventName: 'lowBattery'
        });
        this.defineDriverEvent({
          eventName: 'batteryChange'
        });
        this.defineDriverEvent({
          eventName: 'altitudeChange'
        });
        this.defineDriverEvent({
          eventName: 'update'
        });
        callback(null);
        return this.device.emit('start');
      };

      Nav.prototype.stop = function() {
        return Logger.debug("ARDrone Nav stopping");
      };

      return Nav;

    })(Cylon.Basestar);
  });

}).call(this);
