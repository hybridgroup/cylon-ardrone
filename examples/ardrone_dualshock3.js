"use strict";

var Cylon = require("cylon");

function validatePitch(data) {
  var value = Math.abs(data);
  if (value >= 0.1) {
    if (value <= 1.0) {
      return Math.round(value * 100.0) / 100.0;
    } else {
      return 1.0;
    }
  } else {
    return 0.0;
  }
}

Cylon
  .robot()

  .connection("joystick", { adaptor: "joystick" })
  .connection("ardrone", { adaptor: "ardrone", port: "192.168.1.1" })

  .device("controller", { driver: "dualshock-3", connection: "joystick" })
  .device("drone", { driver: "ardrone", connection: "ardrone" })

  .on("ready", function(bot) {
    var rightStick = { x: 0.0, y: 0.0 },
        leftStick = { x: 0.0, y: 0.0 };

    bot.controller.on("square:press", function() {
      bot.drone.takeoff();
    });

    bot.controller.on("triangle:press", function() {
      bot.drone.hover();
    });

    bot.controller.on("x:press", function() {
      bot.drone.land();
    });

    bot.controller.on("right_x:move", function(data) {
      rightStick.x = data;
    });

    bot.controller.on("right_y:move", function(data) {
      rightStick.y = data;
    });

    bot.controller.on("left_x:move", function(data) {
      leftStick.x = data;
    });

    bot.controller.on("left_y:move", function(data) {
      leftStick.y = data;
    });

    setInterval(function() {
      var pair = leftStick;

      if (pair.y < 0) {
        bot.drone.front(validatePitch(pair.y));
      } else if (pair.y > 0) {
        bot.drone.back(validatePitch(pair.y));
      }

      if (pair.x > 0) {
        bot.drone.right(validatePitch(pair.x));
      } else if (pair.x < 0) {
        bot.drone.left(validatePitch(pair.x));
      }
    }, 0);

    setInterval(function() {
      var pair = rightStick;

      if (pair.y < 0) {
        bot.drone.up(validatePitch(pair.y));
      } else if (pair.y > 0) {
        bot.drone.down(validatePitch(pair.y));
      }

      if (pair.x > 0) {
        bot.drone.clockwise(validatePitch(pair.x));
      } else if (pair.x < 0) {
        bot.drone.counterClockwise(validatePitch(pair.x));
      }
    }, 0);

    setInterval(function() {
      bot.drone.hover();
    }, 10);
  })
  .on("error", console.log);

Cylon.start();
