/*
 * Cylonjs ARDrone commands
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
*/

module.exports = [
  // The default ARDrone commands

  /**
   * Sets the internal 'fly' state to 'true'.
   *
   * @param {Function} callback function to be invoked once the drone is
   * hovering
   * @return {Boolean|null}
   * @publish
   */
  "takeoff",

  /**
   * Sets the internal 'fly' state to 'false'.
   *
   * @param {Function} callback function to be invoked when the drone has landed
   * @return {Boolean|null}
   * @publish
   */
  "land",

  /**
   * Sets all drone movements to 0.
   *
   * This effectively makes it hover in place.
   *
   * @return {null}
   * @publish
   */
  "stop",

  /**
   * Makes the drone gain altitude.
   *
   * @param {Number} speed a 0-1 value for how fast the drone should climb
   * @return {Number}
   * @publish
   */
  "up",

  /**
   * Makes the drone lose altitude.
   *
   * @param {Number} speed a 0-1 value for how fast the drone should fall
   * @return {Number}
   * @publish
   */
  "down",

  /**
   * Makes the drone bank to the left.
   *
   * Controls the roll and horizontal movement using the camera as a reference
   * point.
   *
   * @param {Number} speed a 0-1 value for how fast the drone moves left
   * @return {Number}
   * @publish
   */
  "left",

  /**
   * Makes the drone bank to the right.
   *
   * Controls the roll and horizontal movement using the camera as a reference
   * point.
   *
   * @param {Number} speed a 0-1 value for how fast the drone moves right
   * @return {Number}
   * @publish
   */
  "right",

  /**
   * Makes the drone bank forwards.
   *
   * Controls the pitch and horizontal movement using the camera as a reference
   * point.
   *
   * @param {Number} speed a 0-1 value for how fast the drone moves forward
   * @return {Number}
   * @publish
   */
  "front",

  /**
   * Makes the drone bank backwards.
   *
   * Controls the pitch and horizontal movement using the camera as a reference
   * point.
   *
   * @param {Number} speed a 0-1 value for how fast the drone moves backwards
   * @return {Number}
   * @publish
   */
  "back",

  /**
   * Makes the drone spin in a clockwise direction
   *
   * @param {Number} speed a 0-1 value for how fast the drone should spin
   * @return {Number}
   * @publish
   */
  "clockwise",

  /**
   * Makes the drone spin in a counter-clockwise direction
   *
   * @param {Number} speed a 0-1 value for how fast the drone should spin
   * @return {Number}
   * @publish
   */
  "counterClockwise",

  /**
   * Tells the drone to calibrate a device
   *
   * @param {Number} deviceNum the device the drone should calibrate
   * @return {null}
   * @publish
   */
  "calibrate",

  /**
   * Tells the drone to set a configuration value
   *
   * @param {String} key the config value to set
   * @param {String} value the value to set it to
   * @param {Function} callback a callback to be triggered when it's done
   * @return {null}
   * @publish
   */
  "config",

  /**
   * Performs a pre-programmed flight sequence for a given duration.
   *
   * @param {String} animation the animation to perform
   * @param {Number} duration the duration to perform the animation
   * @return {null}
   * @publish
   */
  "animate",

  /**
   * Performs a pre-programmed LED animation sequence for a given duration, at
   * a given frequency.
   *
   * @param {String} animation the animation to perform
   * @param {Number} hz the frequency to perform the animation at
   * @param {Number} duration the duration to perform the animation
   * @return {null}
   * @publish
   */
  "animateLeds",

  /**
   * Resets the emergency state of the drone.
   *
   * It does this by setting the emergency REF bit to `1` until
   * `navdata.droneState.emergencyLanding` is `0`.
   *
   * This reccovers a drone that has flipped over and shows red lights to be
   * flyable again (with green LEDs).
   *
   * It is also done implicitly when creating a new high-level client.
   *
   * @return {null}
   * @publish
   */
  "disableEmergency",

  // Custom ARDrone commands that we add, mostly aliases for other commands

  /**
   * Makes the drone bank forwards.
   *
   *
   * @see front
   * @param {Number} speed a 0-1 value for how fast the drone moves forward
   * @return {Number}
   * @publish
   */
  "forward",

  /**
   * Tells the drone to do as many front flips as it can in `duration`.
   *
   * @param {Number} duration the duration to do front-flips for
   * @return {null}
   * @publish
   */
  "frontFlip",

  /**
   * Tells the drone to do as many back flips as it can in `duration`.
   *
   * @param {Number} duration the duration to do back-flips for
   * @return {null}
   * @publish
   */
  "backFlip",

  /**
   * Tells the drone to do as many left flips as it can in `duration`.
   *
   * @param {Number} duration the duration to do left-flips for
   * @return {null}
   * @publish
   */
  "leftFlip", 

  /**
   * Tells the drone to do as many right flips as it can in `duration`.
   *
   * @param {Number} duration the duration to do right-flips for
   * @return {null}
   * @publish
   */
  "rightFlip",

  /**
   * Tells the drone to do as many waves as it can in `duration`.
   *
   * @param {Number} duration the duration to wave for
   * @return {null}
   * @publish
   */
  "wave",

  /**
   * Requests a stream of PNGs from the ARDrone's camera.
   *
   * PNGs are emitted through the `data` event on the returned object as they
   * become ready.
   *
   * @return {Object} an object that streams PNGs from the drone's camera
   * @publish
   */
  "getPngStream",

  /**
   * Tells the drone to hover in place.
   *
   * @see stop
   * @param {Number} duration the duration to wave for
   * @return {null}
   * @publish
   */
  "hover",

  /**
   * Tells the drone to perform horizontal trimming.
   *
   * @return {null}
   * @publish
   */
  "ftrim"
];
