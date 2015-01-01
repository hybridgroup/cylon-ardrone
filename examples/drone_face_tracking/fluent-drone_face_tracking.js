"use strict";

var Cylon = require("cylon"),
    haarcascade = __dirname + "/haarcascade_frontalface_alt.xml";

Cylon
  .robot()

  .connection("opencv", { adaptor: "opencv" })
  .connection("ardrone", { adaptor: "ardrone", port: "192.168.1.1" })

  .device("drone", { driver: "ardrone", connection: "ardrone" })
  .device("window", { driver: "window", connection: "opencv" })

  .on("ready", function(bot) {
    this.detect = false;
    this.image = null;
    var self = this;

    bot.drone.getPngStream().on("data", function(png) {
      bot.opencv.readImage(png, function(err, img) {
        self.image = img;
        if (self.detect === false) { bot.window.show(img); }
      });
    });

    bot.opencv.on("facesDetected", function(err, im, faces) {
      var biggest = 0,
      face = null;

      for (var i = 0; i < faces.length; i++) {
        var f = faces[i];
        if (f.width > biggest) {
          biggest = f.width;
          face = f;
        }
      }

      if (face !== null && (face.width <= 100 && face.width >= 45)) {
        im.rectangle(
          [face.x, face.y],
          [face.x + face.width, face.y + face.height],
          [0, 255, 0],
          2
        );

        var center_x = im.width() * 0.5,
        turn = -(face.x - center_x) / center_x;

        console.log("turning:", turn);

        if (turn < 0) {
          bot.drone.clockwise(Math.abs(turn * 0.7));
        } else {
          bot.drone.counterClockwise(Math.abs(turn * 0.7));
        }
      }

      bot.window.show(im);
    });

    bot.drone.takeoff();

    setTimeout(function() {
      bot.drone.up(0.5);
    }, 8000);

    setTimeout(function() {
      bot.drone.hover();
    }, 10000);

    setTimeout(function() {
      self.detect = true;

      setInterval(function() {
        bot.drone.hover();
        bot.opencv.detectFaces(self.image, haarcascade);
      }, 300);

      setTimeout(function() {
        bot.drone.land();
      }, 30000);
    }, 13000);
  });

Cylon.start();
