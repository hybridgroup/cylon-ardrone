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

namespace "Cylon.Driver", ->
  class @ARDrone
    constructor: (opts) ->
      @self = this
      @device = opts.device
      @connection = @device.connection

    commands: ->
      Commands

    start: (callback) ->
      Logger.debug "ARDrone started"
      (callback)(null)

    setupCommands: ->
      for command in Commands
        return if typeof @self[command] is 'function'
        @self[command] = (args...) -> @connection[command](args...)
