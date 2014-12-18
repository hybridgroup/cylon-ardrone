"use strict";

var Cylon = require("cylon");

Cylon.robot({
  connections: {
    ardrone: { adaptor: "ardrone", port: "192.168.1.1" }
  },

  devices: {
    drone: { driver: "ardrone" }
  },

  work: function(my) {
    my.drone.takeoff();
    after((10).seconds(), my.drone.land);
    after((15).seconds(), my.drone.stop);
  }
}).start();
