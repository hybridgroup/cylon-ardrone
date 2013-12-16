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
  class @Flight extends Cylon.Drivers.Driver
    constructor: (opts) ->
      super
      @proxyMethods Cylon.ARDrone.Commands, @connection, this

    commands: -> Cylon.ARDrone.Commands

    forward: (args...) ->
      @connection.front(args...)

    frontFlip: ->
      @connection.animate 'flipAhead', 150

    backFlip: ->
      @connection.animate 'flipBehind', 150

    leftFlip: ->
      @connection.animate 'flipLeft', 150

    rightFlip: ->
      @connection.animate 'flipRight', 150

    wave: ->
      @connection.animate 'wave', 750
