/*
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

"use strict";

var ARDrone = require("./ardrone");

var Flight = require("./flight"),
    Nav = require("./nav");

module.exports = {
  adaptors: ["ardrone"],
  drivers: ["ardrone", "ardrone-nav"],

  adaptor: function(opts) {
    return new ARDrone(opts);
  },

  driver: function(opts) {
    if (opts == null) {
      opts = {};
    }

    switch (opts.driver) {
      case "ardrone":
        return new Flight(opts);

      case "ardrone-nav":
        return new Nav(opts);

      default:
        return null;
    }
  }
};
