/*
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var LibARDrone, namespace;

  LibARDrone = require('ar-drone');

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Adaptor", function() {
    return this.ARDrone = (function() {
      function ARDrone(opts) {
        this.self = this;
        this.connection = opts.connection;
        this.name = opts.name;
        this.ardrone = null;
        proxyFunctionsToObject(Cylon.ARDrone.Commands, this.ardrone, this);
      }

      ARDrone.prototype.commands = function() {
        return Cylon.ARDrone.Commands;
      };

      ARDrone.prototype.connect = function(callback) {
        var _this = this;
        Logger.debug("Connecting to ARDrone '" + this.name + "'...");
        this.ardrone = new LibARDrone.createClient({
          ip: this.connection.port.toString()
        });
        this.ardrone.on('navdata', function(data) {
          return _this.connection.emit('navdata', data);
        });
        this.connection.emit('connect');
        return callback(null);
      };

      ARDrone.prototype.disconnect = function() {
        return Logger.debug("Disconnecting from ARDrone '" + this.name + "'...");
      };

      return ARDrone;

    })();
  });

}).call(this);
