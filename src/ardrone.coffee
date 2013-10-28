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
  class @ARDrone
    constructor: (opts) ->
      @self = this
      @connection = opts.connection
      @name = opts.name
      @ardrone = null

    commands: ->
      Cylon.ARDrone.Commands

    connect: (callback) ->
      Logger.debug "Connecting to ARDrone '#{@name}'..."
      @ardrone = new LibARDrone.createClient(ip: @connection.port.toString())
      @ardrone.on 'navdata', (data) =>
        @connection.emit 'navdata', data

      @setupCommands()
      @connection.emit 'connect'
      (callback)(null)

    disconnect: ->
      Logger.debug "Disconnecting from ARDrone '#{@name}'..."

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @ardrone[command](args...)
