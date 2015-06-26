"use strict";

var ARDrone = require("./lib/ardrone");

var Drivers = {
  ardrone: require("./lib/flight"),
  "ardrone-nav": require("./lib/nav")
};

module.exports = {
  adaptors: ["ardrone"],
  drivers: ["ardrone", "ardrone-nav"],

  adaptor: function(opts) {
    return new ARDrone(opts);
  },

  driver: function(opts) {
    opts = opts || {};

    if (!Drivers[opts.driver]) {
      return null;
    }

    return new Drivers[opts.driver](opts);
  }
};
