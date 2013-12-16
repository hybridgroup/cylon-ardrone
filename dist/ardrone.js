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
        this.ardrone = new LibARDrone.createClient({
          ip: this.connection.port.toString()
        });
        this.connector = this.ardrone;
        this.proxyMethods(Cylon.ARDrone.Commands, this.ardrone, this.myself);
        this.defineAdaptorEvent({
          eventName: 'navdata'
        });
        this.defineAdaptorEvent({
          eventName: 'landing'
        });
        this.defineAdaptorEvent({
          eventName: 'landed'
        });
        this.defineAdaptorEvent({
          eventName: 'takeoff'
        });
        this.defineAdaptorEvent({
          eventName: 'hovering'
        });
        this.defineAdaptorEvent({
          eventName: 'flying'
        });
        this.defineAdaptorEvent({
          eventName: 'lowBattery'
        });
        this.defineAdaptorEvent({
          eventName: 'batteryChange'
        });
        this.defineAdaptorEvent({
          eventName: 'altitudeChange'
        });
        return ARDrone.__super__.connect.apply(this, arguments);
      };

      return ARDrone;

    })(Cylon.Adaptors.Adaptor);
  });

}).call(this);
