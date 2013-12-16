###
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
require './cylon-ardrone'
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Drivers.ARDrone", ->
  class @Flight extends Cylon.Driver
    constructor: (opts) ->
      super
      @proxyMethods Cylon.ARDrone.Commands, @connection, this

    commands: -> Cylon.ARDrone.Commands

    # Public: Moves the drone forward by a specified interval (0-1)
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.forward(1)
    forward: (args...) ->
      @connection.front(args...)

    # Public: Makes the drone do a front-flip
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.frontflip()
    frontFlip: ->
      @connection.animate 'flipAhead', 150

    # Public: Makes the drone do a back-flip
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.backflip()
    backFlip: ->
      @connection.animate 'flipBehind', 150

    # Public: Makes the drone do a left-flip
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.leftflip()
    leftFlip: ->
      @connection.animate 'flipLeft', 150

    # Public: Makes the drone do a right-flip
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.rightflip()
    rightFlip: ->
      @connection.animate 'flipRight', 150

    # Public: Makes the drone wave
    #
    # Returns nothing
    # Example:
    #
    #     my.drone.wave()
    wave: ->
      @connection.animate 'wave', 750
