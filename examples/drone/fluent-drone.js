"use strict";

var Cylon = require("cylon");

Cylon.robot()
  .connection("ardrone", { adaptor: "ardrone", port: "192.168.1.1" })
  .device("drone", { driver: "ardrone" })
  .on("ready", function(robot) {
    robot.drone.takeoff();

    setTimeout(function() {
      robot.drone.land();
    }, 10000);

    setTimeout(function() {
      robot.drone.stop();
    }, 15000);
  });

Cylon.start();
