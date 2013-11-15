###
 * Cylonjs ARDrone adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

LibARDrone = require 'ar-drone'
namespace = require 'node-namespace'
require './commands'

namespace "Cylon.Adaptor", ->
  class @ARDrone extends Cylon.Basestar
    constructor: (opts) ->
      super
      @connection = opts.connection
      @name = opts.name
      @ardrone = null
      @connector = null
      @myself = this

    commands: -> Cylon.ARDrone.Commands

    connect: (callback) ->
      Logger.debug "Connecting to ARDrone '#{@name}'..."
      @ardrone = new LibARDrone.createClient(ip: @connection.port.toString())
      @connector = @ardrone

      @proxyMethods Cylon.ARDrone.Commands, @ardrone, @myself

      @defineAdaptorEvent eventName: 'navdata'
      @defineAdaptorEvent eventName: 'landing'
      @defineAdaptorEvent eventName: 'landed'
      @defineAdaptorEvent eventName: 'takeoff'
      @defineAdaptorEvent eventName: 'hovering'
      @defineAdaptorEvent eventName: 'flying'
      @defineAdaptorEvent eventName: 'lowBattery'
      @defineAdaptorEvent eventName: 'batteryChange'
      @defineAdaptorEvent eventName: 'altitudeChange'

      (callback)(null)
      @connection.emit 'connect'

    disconnect: ->
      Logger.debug "Disconnecting from ARDrone '#{@name}'..."
