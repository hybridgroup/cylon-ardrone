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

  require('./cylon-ardrone');

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Drivers.ARDrone", function() {
    var _ref;
    return this.Nav = (function(_super) {
      __extends(Nav, _super);

      function Nav() {
        _ref = Nav.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      # Public: Starts the driver
      #
      # Returns null
      Nav.prototype.start = function(callback) {
        var event, events, _i, _len;
        Logger.debug("ARDrone nav started");
        events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying', 'lowBattery', 'batteryChange', 'altitudeChange', 'update'];
        for (_i = 0, _len = events.length; _i < _len; _i++) {
          event = events[_i];
          this.defineDriverEvent({
            eventName: event
          });
        }
        return Nav.__super__.start.apply(this, arguments);
      };

      return Nav;

    })(Cylon.Driver);
  });

}).call(this);
