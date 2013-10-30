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
          return _this.device.emit('navdata', data);
        });
        return callback(null);
      };

      return Nav;

    })(Cylon.Basestar);
  });

}).call(this);
