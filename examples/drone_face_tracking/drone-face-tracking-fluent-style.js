var cylon = require('cylon');

var haarcascade = __dirname + "/haarcascade_frontalface_alt.xml";

cylon.robot({
  connections: {
    opencv: { adaptor: 'opencv' },
    ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
  },

  devices: {
    drone: { driver: 'ardrone', connection: 'ardrone' },
    window: { driver: 'window', connection: 'opencv' }
  }
})

.on('ready', function(robot) {
  this.detect = false;
  this.image = null;
  var self = this;

  robot.drone.getPngStream().on('data', function(png) {
    robot.opencv.readImage(png, function(err, img) {
      self.image = img;
      if (self.detect === false) { robot.window.show(img); }
    });
  });

  robot.opencv.on('facesDetected', function(err, im, faces) {
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
        robot.drone.clockwise(Math.abs(turn * 0.7));
      } else {
        robot.drone.counterClockwise(Math.abs(turn * 0.7));
      }
    }

    robot.window.show(im);
  });

  robot.drone.takeoff();

  setTimeout(function() {
    robot.drone.up(0.5);
  }, 8000);

  setTimeout(function() {
    robot.drone.hover();
  }, 10000);

  setTimeout(function() {
    self.detect = true;

    setInterval(function() {
      robot.drone.hover();
      robot.opencv.detectFaces(self.image, haarcascade);
    }, 300);

    setTimeout(function() {
      robot.drone.land();
    }, 30000);
  }, 13000);
})

.start();
