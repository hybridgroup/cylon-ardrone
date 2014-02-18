haarcascade = "#{ __dirname }/haarcascade_frontalface_alt.xml"
Cylon = require 'cylon'

Cylon.robot
  connections: [
    { name: 'opencv', adaptor: 'opencv' },
    { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' }
  ]

  devices: [
    { name: 'drone', driver: 'ardrone', connection: 'ardrone' },
    { name: 'window', driver: 'window', conneciton: 'opencv' },
    { name: 'opencv', driver: 'opencv', conneciton: 'opencv' }
  ]

  work: (my) ->
    @detect = false
    @image = null
    my.drone.getPngStream().on 'data', (png) =>
      my.opencv.readImage png, (err, img) =>
        @image = img
        if @detect == false
          my.window.show img

    my.opencv.on 'facesDetected', (err, im, faces) =>
      biggest = 0
      face = null
      for f in faces
        if f.width > biggest
          biggest = f.width
          face = f
      if face != null && (face.width <= 100 && face.width >= 45)
        im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], [0,255,0], 2)
        center_x = im.width() * 0.5
        turn = -( face.x - center_x ) / center_x
        console.log "turning: #{turn}"
        if turn < 0 
          my.drone.clockwise Math.abs(turn * 0.7)
        else 
          my.drone.counterClockwise Math.abs(turn * 0.7)
      my.window.show im

    my.drone.takeoff()
    after 8.seconds(), -> my.drone.up(0.5)
    after 10.seconds(), -> my.drone.hover()

    after 13.seconds(), =>
      @detect = true
      every 0.3.seconds(), =>
        my.drone.hover()
        my.opencv.detectFaces @image, haarcascade
      after 30.seconds(), => my.drone.land()
.start()
