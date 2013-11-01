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


      @defineDriverEvent(eventName: 'navdata')
      @defineDriverEvent(eventName: 'landing')
      @defineDriverEvent(eventName: 'landed')
      @defineDriverEvent(on: 'takeoff')
      @defineDriverEvent(on: 'hovering')
      @defineDriverEvent(on: 'fliying')
      @defineDriverEvent(on: 'lowBattery')
      @defineDriverEvent(on: 'batteryChange')
      @defineDriverEvent(on: 'altitudeChange')
      @defineDriverEvent(on: 'update')
      @defineDriverEvent eventName: 'navdata'

      @device.emit 'start'
     (callback)(null)
