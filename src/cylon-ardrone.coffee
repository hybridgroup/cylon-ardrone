###
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

namespace = require 'node-namespace'

require('./ardrone')
require('./flight')
require('./nav')

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptor.ARDrone(args...)

  driver: (opts) ->
    if opts.name is 'ardrone'
      new Cylon.Driver.ARDrone.Flight(opts)
    else if opts.name is 'ardroneNav'
      new Cylon.Driver.ARDrone.Nav(opts)

  register: (robot) ->
    Logger.debug "Registering ARDrone adaptor and drivers for #{robot.name}"
    robot.registerAdaptor 'cylon-ardrone', 'ardrone'
    robot.registerDriver 'cylon-ardrone', 'ardrone'
    robot.registerDriver 'cylon-ardrone', 'ardroneNav'
