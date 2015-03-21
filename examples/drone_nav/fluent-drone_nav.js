"use strict";

var Cylon = require("cylon");

Cylon
  .robot()
  .connection("ardrone", { adaptor: "ardrone", port: "192.168.1.1" })
  .device("drone", { driver: "ardrone" })
  .device("nav", { driver: "ardroneNav" })
  .on("ready", function(bot) {
    bot.drone.config("general:navdata_demo", "TRUE");
    bot.nav.on("navdata", console.log);
  });

Cylon.start();
