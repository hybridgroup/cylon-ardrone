###
 * Cylong ARDrone flight commander driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Driver.ARDrone", ->
  class @Flight extends Cylon.Basestar
    constructor: (opts) ->
      super
      @device = opts.device
      @connection = @device.connection
      @proxyMethods Cylon.ARDrone.Commands, @connection, this

    commands: -> Cylon.ARDrone.Commands

    start: (callback) ->
      Logger.debug "ARDrone started"
      (callback)(null)
      @device.emit 'start'

    stop: ->
      Logger.debug "ARDrone stopping"

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
