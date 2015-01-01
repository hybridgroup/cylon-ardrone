"use strict";

var Cylon = require("cylon");

var haarcascade = __dirname + "/haarcascade_frontalface_alt.xml";

Cylon.robot({
  connections: {
    opencv: { adaptor: "opencv" },
    ardrone: { adaptor: "ardrone", port: "192.168.1.1" }
  },

  devices: {
    drone: { driver: "ardrone", connection: "ardrone" },
    window: { driver: "window", connection: "opencv" }
  },

  work: function(my) {
    this.detect = false;
    this.image = null;
    var self = this;

    my.drone.getPngStream().on("data", function(png) {
      my.opencv.readImage(png, function(err, img) {
        self.image = img;
        if (self.detect === false) { my.window.show(img); }
      });
    });

    my.opencv.on("facesDetected", function(err, im, faces) {
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
          my.drone.clockwise(Math.abs(turn * 0.7));
        } else {
          my.drone.counterClockwise(Math.abs(turn * 0.7));
        }
      }

      my.window.show(im);
    });

    my.drone.takeoff();

    after((8).seconds(), function() { my.drone.up(0.5); });
    after((10).seconds(), my.drone.hover);

    after((13).seconds(), function() {
      self.detect = true;

      every((0.3).seconds(), function() {
        my.drone.hover();
        my.opencv.detectFaces(self.image, haarcascade);
      });

      after((30).seconds, my.drone.land);
    });
  }
}).start();
