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
    __slice = [].slice;

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
      }

      ARDrone.prototype.commands = function() {
        return Commands;
      };

      ARDrone.prototype.connect = function(callback) {
        Logger.debug("Connecting to ARDrone '" + this.name + "'...");
        this.ardrone = new LibARDrone.createClient();
        this.setupCommands();
        this.connection.emit('connect');
        return callback(null);
      };

      ARDrone.prototype.disconnect = function() {
        return Logger.debug("Disconnecting from ARDrone '" + this.name + "'...");
      };

      ARDrone.prototype.setupCommands = function() {
        var command, _i, _len;
        for (_i = 0, _len = Commands.length; _i < _len; _i++) {
          command = Commands[_i];
          if (typeof this.self[command] === 'function') {
            return;
          }
          this.self[command] = function() {
            var args, _ref;
            args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
            return (_ref = this.ardrone)[command].apply(_ref, args);
          };
        }
      };

      return ARDrone;

    })();
  });

}).call(this);
