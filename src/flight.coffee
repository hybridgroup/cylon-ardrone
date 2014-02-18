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
    hover: ->
      @connection.stop()

    # Public: Moves the drone forward by a specified interval (0-1)
    #
    # speed - integer speed drone should move forward (0-1)
    #
    # Examples
    #
    #     my.drone.forward(1)
    #
    # Returns nothing
    forward: (args...) ->
      @connection.front(args...)

    # Public: Makes the drone do a front-flip
    #
    # Examples
    #
    #     my.drone.frontflip()
    #
    # Returns nothing
    frontFlip: ->
      @connection.animate 'flipAhead', 150

    # Public: Makes the drone do a back-flip
    #
    # Examples
    #
    #     my.drone.backflip()
    #
    # Returns nothing
    backFlip: ->
      @connection.animate 'flipBehind', 150

    # Public: Makes the drone do a left-flip
    #
    # Examples
    #
    #     my.drone.leftflip()
    #
    # Returns nothing
    leftFlip: ->
      @connection.animate 'flipLeft', 150

    # Public: Makes the drone do a right-flip
    #
    # Examples
    #
    #     my.drone.rightflip()
    #
    # Returns nothing
    rightFlip: ->
      @connection.animate 'flipRight', 150

    # Public: Makes the drone wave
    #
    # Examples
    #
    #     my.drone.wave()
    #
    # Returns nothing
    wave: ->
      @connection.animate 'wave', 750
