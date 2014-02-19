Cylon = require 'cylon'

Cylon.robot
  connections: [
    { name: 'dualshock3', adaptor: 'joystick', controller: 'dualshock3' },
    { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1'}
  ]

  devices: [
    { name: 'controller', driver: 'dualshock3', connection: 'dualshock3' },
    { name: 'drone', driver: 'ardrone', connection: 'ardrone'} ]

  validate_pitch: (data, offset) ->
    value = Math.abs(data) / offset
    if value >= 0.1
      if value <= 1.0
        Math.round(value * 100.0) / 100.0
      else 
        1.0
    else
      0.0

  work: (my) ->
    @offset = 125.0
    @right_stick = {x:@offset, y:@offset}
    @left_stick = {x:@offset, y:@offset}

    my.controller.on "square:press", ->
      my.drone.takeoff()
    my.controller.on "triangle:press", -> 
      my.drone.hover()
    my.controller.on "x:press", -> 
      my.drone.land()
    my.controller.on "right:move", (pair) => 
      @right_stick = pair
    my.controller.on "left:move", (pair) => 
      @left_stick = pair

    every 0, =>
      pair = @left_stick
      if pair.y < @offset-5
        my.drone.front(my.validate_pitch(pair.y-@offset, @offset))
      else if pair.y > @offset+5
        my.drone.back(my.validate_pitch(pair.y-@offset, @offset))

      if pair.x > @offset+5
        my.drone.right(my.validate_pitch(pair.x-@offset, @offset))
      else if pair.x < @offset-5
        my.drone.left(my.validate_pitch(pair.x-@offset, @offset))

    every 0, =>
      pair = @right_stick
      if pair.y < @offset-5
        my.drone.up(my.validate_pitch(pair.y-@offset, @offset))
      else if pair.y > @offset+5
        my.drone.down(my.validate_pitch(pair.y-@offset, @offset))

      if pair.x > @offset+20
        my.drone.clockwise(my.validate_pitch(pair.x-@offset, @offset))
      else if pair.x < @offset-20
        my.drone.counterClockwise(my.validate_pitch(pair.x-@offset, @offset))

    every 0.1.seconds(), =>
      my.drone.hover()

Cylon.start()