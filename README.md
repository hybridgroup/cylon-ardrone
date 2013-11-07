# Cylon.js For ARDrone

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and drivers for the ARDrone 2.0 from Parrot (http://ardrone2.parrot.com/). It uses the node-ar-drone module (https://github.com/felixge/node-ar-drone) created by [@felixge](https://github.com/felixge) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-ardrone.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-ardrone)

## Getting Started
Install the module with: `npm install cylon-ardrone`

## Examples

```javascript
var Cylon = require('cylon');

Cylon.robot({
  connection: { name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1' },
  device: {name: 'drone', driver: 'ardrone'},

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

```coffee-script
Cylon = require 'cylon'

Cylon.robot
  connection:
    name: 'ardrone', adaptor: 'ardrone', port: '192.168.1.1'

  device:
    name: 'ardrone', driver: 'ardrone'

  work: (my) ->
    my.drone.takeoff()
    after 10.seconds(), ->
      my.drone.land()
    after 15.seconds(), ->
      my.drone.stop()

.start()
```

## Documentation
We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Version 0.1.0 - Initial release that can fly

Version 0.1.1 - Correct events for navdata

Version 0.2.0 - Now update and specific events too

Version 0.3.0 - Refactor to use Cylon.Basestar

Version 0.4.0 - Newer Cylon.Basestar proxying

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
