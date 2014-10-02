var cylon = require('cylon');

function validatePitch(data, offset) {
  var value = Math.abs(data) / offset;
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

cylon.robot({
  connections: [
    {name: 'dualshock3', adaptor: 'joystick'}, 
    {name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1'}
  ],
  devices: [
    {name: 'controller', driver: 'dualshock-3', connection: 'dualshock3'}, 
    {name: 'drone', driver: 'ardrone', connection: 'ardrone'}
  ]
})
  .on("ready", function(bot) {
    var offset = 32767.0;
    var rightStick = {
      x: 0.0,
      y: 0.0
    };
    var leftStick = {
      x: 0.0,
      y: 0.0
    };
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
      if (pair.y < 5) {
        bot.drone.front(validatePitch(pair.y, offset));
      } else if (pair.y > 5) {
        bot.drone.back(validatePitch(pair.y, offset));
      }
      if (pair.x > 5) {
        bot.drone.right(validatePitch(pair.x, offset));
      } else if (pair.x < 5) {
        bot.drone.left(validatePitch(pair.x, offset));
      }
    }, 0);

    setInterval(function() {
      var pair = rightStick;
      if (pair.y < 5) {
        bot.drone.up(validatePitch(pair.y, offset));
      } else if (pair.y > 5) {
        bot.drone.down(validatePitch(pair.y, offset));
      }
      if (pair.x > 20) {
        bot.drone.clockwise(validatePitch(pair.x, offset));
      } else if (pair.x < 20) {
        bot.drone.counterClockwise(validatePitch(pair.x, offset));
      }
    }, 0);

    setInterval(function() {
      bot.drone.hover();
    }, 10);
  })
  .on('error', function(err) {
    console.log(err);
  })
  .start();

