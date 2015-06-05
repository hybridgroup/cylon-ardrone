# Cylon.js For ARDrone

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and drivers for the ARDrone 2.0 from Parrot (http://ardrone2.parrot.com/). It uses the node-ar-drone module (https://github.com/felixge/node-ar-drone) created by [@felixge](https://github.com/felixge) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-ardrone.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-ardrone) [![Code Climate](https://codeclimate.com/github/hybridgroup/cylon-ardrone/badges/gpa.svg)](https://codeclimate.com/github/hybridgroup/cylon-ardrone) [![Test Coverage](https://codeclimate.com/github/hybridgroup/cylon-ardrone/badges/coverage.svg)](https://codeclimate.com/github/hybridgroup/cylon-ardrone)

## How to Install

Installing cylon.js with ardrone support is pretty easy.

    npm install cylon cylon-ardrone

## How to Use

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connections: {
    ardrone: { adaptor: 'ardrone', port: '192.168.1.1' }
  },

  devices: {
    drone: { driver: 'ardrone' }
  },

  work: function(my) {
    my.drone.takeoff();
    after((10).seconds(), function() {
      my.drone.land();
    });
    after((15).seconds(), function() {
      my.drone.stop();
    });
  }
}).start();
```

## How to Connect

The ARDrone is a WiFi device, so there is no additional work to establish a connection to a single drone. However, in order to connect to multiple drones, you need to perform some configuration steps on each drone via SSH.

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

For our contribution guidelines, please go to [https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
](https://github.com/hybridgroup/cylon/blob/master/CONTRIBUTING.md
).

## Release History

For the release history, please go to [https://github.com/hybridgroup/cylon-ardrone/blob/master/RELEASES.md
](https://github.com/hybridgroup/cylon-ardrone/blob/master/RELEASES.md
).

## License
Copyright (c) 2013-2015 The Hybrid Group. Licensed under the Apache 2.0 license.
