"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    ardrone: { adaptor: "ardrone", port: "192.168.1.1" }
  },

  devices: {
    drone: { driver: "ardrone" },
    nav: { driver: "ardrone-nav" }
  },

  work: function(my) {
    my.drone.config("general:navdata_demo", "TRUE");
    my.nav.on("navdata", console.log);
  }
}).start();
