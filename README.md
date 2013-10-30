# Cylon.js Module For ARDrone

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an interface to the ARDrone 2.0 from Parrot. It uses the node-ar-drone module (https://github.com/felixge/node-ar-drone) created by [@felixge](https://github.com/felixge) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-ardrone.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-ardrone)

## Getting Started
Install the module with: `npm install cylon-ardrone`

## Examples

```javascript
var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connection: { name: 'ardrone', adaptor: 'ardrone' },
  device: {name: 'drone', driver: 'ardrone'},

  work: function(my) {
    my.drone.takeOff();
    after((10).seconds(), function() { 
      my.drone.hover();
    });
    after((20).seconds(), function() { 
      my.drone.land();
    });
    after((25).seconds(), function() { 
      my.drone.stop();
    });    
  }
}).start();
```

```coffee-script
Cylon = require('cylon')

Cylon.robot
  connection:
    name: 'ardrone', adaptor: 'ardrone'

  device:
    name: 'ardrone', driver: 'ardrone'

  work: (my) ->
    my.drone.takeOff()
    after 10.seconds(), ->
      my.drone.hover()
    after 20.seconds(), ->
      my.drone.land()
    after 25.seconds(), ->
      my.drone.stop()

.start()
```

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 The Hybrid Group. Licensed under the Apache 2.0 license.
