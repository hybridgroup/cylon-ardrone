/*
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/


(function() {
  'use strict';
  var namespace;

  namespace = require('node-namespace');

  require('./commands');

  namespace("Cylon.Driver.ARDrone", function() {
    return this.Nav = (function() {
      function Nav(opts) {
        this.self = this;
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
          return _this.emit('navdata', data);
        });
        return callback(null);
      };

      return Nav;

    })();
  });

}).call(this);
