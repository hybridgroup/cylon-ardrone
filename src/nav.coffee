###
 * Cylong ARDrone navigation data driver
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
  class @Nav extends Cylon.Driver
    start: (callback) ->
      Logger.debug "ARDrone nav started"

      events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
                'lowBattery', 'batteryChange', 'altitudeChange', 'update']

      @defineDriverEvent(eventName: event) for event in events

      super
