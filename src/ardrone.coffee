###
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require './cylon-ardrone'
LibARDrone = require 'ar-drone'
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Adaptors", ->
  class @ARDrone extends Cylon.Adaptor
    constructor: (opts) ->
      super
      @ardrone = null
      @connector = null
      @myself = this

    commands: -> Cylon.ARDrone.Commands

    connect: (callback) ->
      @ardrone = new LibARDrone.createClient(ip: @connection.port.toString())
      @connector = @ardrone

      @proxyMethods Cylon.ARDrone.Commands, @ardrone, @myself

      events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
                'lowBattery', 'batteryChange', 'altitudeChange']

      @defineAdaptorEvent(eventName: event) for event in events

      super
