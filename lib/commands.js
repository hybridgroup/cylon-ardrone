/*
 * Cylonjs ARDrone commands
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

var Commands = module.exports = [
  // The default ARDrone commands

  // Public: Sets the internal fly state to true, callback is invoked 
  // after the drone reports that it is hovering.
  //
  // callback - params
  //
  // Returns true | nil
  'takeoff',

  // Public: Sets the internal fly state to false, callback is invoked 
  // after the drone reports it has landed.
  //
  // callback - params
  //
  // Returns true | nil
  'land',

  // Public: Sets all drone movement commands to 0, making it effectively hover in place.
  //
  // Returns nil
  'stop',

  // Public: Makes the drone gain altitude.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  //
  // Returns value from 0 to 1
  'up',

  // Public: Makes the drone reduce altitude.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  //
  // Returns value from 0 to 1
  'down',

  // Public: Causes the drone to bank to the left, controls the roll, which is 
  // a horizontal movement using the camera as a reference point.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  //
  // Returns value from 0 to 1
  'left',

  // Public: Causes the drone to bank to the right, controls the roll, which is 
  // a horizontal movement using the camera as a reference point.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  //
  // Returns value from 0 to 1
  'right',

  // Public: Causes the drone to bank forward, controls the pitch, which a horizontal 
  // movement using the camera as a reference point.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  // forward(speed) - params
  //
  // Returns value from 0 to 1
  'front',

  // Public: Causes the drone to bank to the back, controls the pitch, which a horizontal 
  // movement using the camera as a reference point.
  // speed can be a value from 0 to 1.
  //
  // speed - params
  //
  // Returns value from 0 to 1
  'back',


  // Public: Causes the drone to spin.
  // speed can be a value from 0 to 1.
  //
  // Returns value from 0 to 1
  'clockwise',

  // Public: Causes the drone to spin.
  // speed can be a value from 0 to 1.
  //
  // Returns value from 0 to 1
  'counterClockwise',

  // Public: Asks the drone to calibrate a device.
  //
  // device_num - params
  //
  // Returns nil
  'calibrate',

  // Public: Sends a config command to the drone.
  //
  // key - params
  // value - params
  // callback - params
  //
  // Returns nil
  'config',

  // Public: Performs a pre-programmed flight sequence for a given duration (in ms).
  //
  // animation - params
  // duration - params
  //
  // Returns nil
  'animate',

  // Public: Performs a pre-programmed led sequence at given hz frequency and duration (in sec!). 
  //
  // animation - params
  // hz - params
  // duration - params
  //
  // Returns nil
  'animateLeds',

  // Public: Causes the emergency REF bit to be set to 1 until 
  // navdata.droneState.emergencyLanding is 0. This recovers a drone that has 
  // flipped over and is showing red lights to be flyable again and show green 
  // lights. It is also done implicitly when creating a new high level client. 
  //
  // Returns nil
  'disableEmergency',

  // Custom ARDrone commands that we add, mostly aliases for other commands

  // Public: Causes the drone to go forward.
  //
  // Returns nil
  'forward',

  // Public: Tells the drone to do a front-flip. 
  //
  // Examples
  //
  //   animate('flipAhead', 150)
  //
  // Returns nil
  'frontFlip',

  // Public: Tells the drone to do a back-flip.
  //
  // Examples
  //
  //   animate("flipBehind", 150)
  //
  // Returns nil
  'backFlip',

  // Public: Tells the drone to do a left-flip.
  //
  // Examples
  //
  //   animate("flipLeft", 150)
  //
  // Returns nil 
  'leftFlip', 

  // Public: Tells the drone to do a right-flip.
  //
  // Examples
  //
  //   animate("flipRight", 150)
  //
  // Returns nil
  'rightFlip',

  // Public: Tells the drone to do a wave.
  //
  // Examples
  //
  //   animate("wave", 750)
  //
  // Returns nil
  'wave',
  'getPngStream',
  'hover'
];
