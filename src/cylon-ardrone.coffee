###
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require "cylon"
require './ardrone'
require './flight'
require './nav'

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptors.ARDrone(args...)

  driver: (opts) ->
    if opts.name is 'ardrone'
      new Cylon.Drivers.ARDrone.Flight(opts)
    else if opts.name is 'ardroneNav'
      new Cylon.Drivers.ARDrone.Nav(opts)

  register: (robot) ->
    Logger.debug "Registering ARDrone adaptor and drivers for #{robot.name}"
    robot.registerAdaptor 'cylon-ardrone', 'ardrone'
    robot.registerDriver 'cylon-ardrone', 'ardrone'
    robot.registerDriver 'cylon-ardrone', 'ardroneNav'
