# Cylon.js For ARDrone

Cylon.js (http://cylonjs.com) is a JavaScript framework for robotics and physical computing using Node.js

This module provides an adaptor and drivers for the ARDrone 2.0 from Parrot (http://ardrone2.parrot.com/). It uses the node-ar-drone module (https://github.com/felixge/node-ar-drone) created by [@felixge](https://github.com/felixge) thank you!

Want to use Ruby on robots? Check out our sister project Artoo (http://artoo.io)

Want to use the Go programming language to power your robots? Check out our sister project Gobot (http://gobot.io).

[![Build Status](https://secure.travis-ci.org/hybridgroup/cylon-ardrone.png?branch=master)](http://travis-ci.org/hybridgroup/cylon-ardrone)

## Getting Started
Install the module with: `npm install cylon-ardrone`

## Example

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

## Documentation

We're busy adding documentation to our web site at http://cylonjs.com/ please check there as we continue to work on Cylon.js

Thank you!

## Contributing

* All patches must be provided under the Apache 2.0 License
* Please use the -s option in git to "sign off" that the commit is your work and you are providing it under the Apache 2.0 License
* Submit a Github Pull Request to the appropriate branch and ideally discuss the changes with us in IRC.
* We will look at the patch, test it out, and give you feedback.
* Avoid doing minor whitespace changes, renamings, etc. along with merged content. These will be done by the maintainers from time to time but they can complicate merges and should be done seperately.
* Take care to maintain the existing coding style.
* Add unit tests for any new or changed functionality & Lint and test your code using [Grunt](http://gruntjs.com/).
* All pull requests should be "fast forward"
  * If there are commits after yours use “git rebase -i <new_head_branch>”
  * If you have local changes you may need to use “git stash”

## Release History

Version 0.13.0 - Compatibility with Cylon 0.18.0

Version 0.12.0 - Compatibility with Cylon 0.16.0

Version 0.11.1 - Add peerDependencies to package.json

Version 0.11.0 - Compatibility with Cylon 0.15.0

Version 0.10.0 - Compatibility with Cylon 0.14.0, remove node-namespace.

Version 0.9.0 - Update to cylon 0.12.0

Version 0.8.0 - Update to cylon 0.11.0, refactor into pure JavaScript

Version 0.7.0 - Update to cylon 0.10.0, bugfixes

Version 0.6.0 - Release for cylon 0.9.0

Version 0.5.0 - Release for cylon 0.8.0

Version 0.4.0 - Newer Cylon.Basestar proxying

Version 0.3.0 - Refactor to use Cylon.Basestar

Version 0.2.0 - Now update and specific events too

Version 0.1.1 - Correct events for navdata

Version 0.1.0 - Initial release that can fly

## License
Copyright (c) 2013-2014 The Hybrid Group. Licensed under the Apache 2.0 license.
