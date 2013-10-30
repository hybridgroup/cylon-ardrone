###
 * Cylong ARDrone navigation data driver
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Driver.ARDrone", ->
  class @Nav extends Cylon.Basestar
    constructor: (opts) ->
      super
      @device = opts.device
      @connection = @device.connection

    commands: ->
      []

    start: (callback) ->
      Logger.debug "ARDrone nav started"
      @connection.on 'navdata', (data) =>
        @device.emit 'update', 'navdata', data
        @device.emit 'navdata', data

      @connection.on 'landing', =>
        @device.emit 'update', 'landing'
        @device.emit 'landing'

      @connection.on 'landed', =>
        @device.emit 'update', 'landed'
        @device.emit 'landed'

      @connection.on 'takeoff', =>
        @device.emit 'update', 'takeoff'
        @device.emit 'takeoff'

      @connection.on 'hovering', =>
        @device.emit 'update', 'hovering'
        @device.emit 'hovering'

      @connection.on 'flying', =>
        @device.emit 'update', 'flying'
        @device.emit 'flying'

      @connection.on 'lowBattery', (battery) =>
        @device.emit 'update', 'lowBattery', battery
        @device.emit 'lowBattery', battery

      @connection.on 'batteryChange', (battery) =>
        @device.emit 'update', 'batteryChange', battery
        @device.emit 'batteryChange', battery

      @connection.on 'altitudeChange', (altitude) =>
        @device.emit 'update', 'altitudeChange', altitude
        @device.emit 'altitudeChange', altitude

      (callback)(null)
      @device.emit 'start'
