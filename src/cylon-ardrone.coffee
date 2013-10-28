###
 * cylon-ardrone
 * http://cylonjs.com
 *
 * Copyright (c) 2013 The Hybrid Group
 * Licensed under the Apache 2.0 license.
###

'use strict';

require('./ardrone')

module.exports =
  adaptor: (args...) ->
    new Cylon.Adaptor.ARDrone(args...)

  driver: (opts) ->
    if opts.name is 'ardrone'
      new Cylon.Driver.ARDrone(opts)
    # else if opts.name is 'ardroneNav'
    #   new Cylon.Driver.ARDroneNav(opts)
    # else if opts.name is 'ardroneVideo'
    #   new Cylon.Driver.ARDroneVideo(opts)

  register: (robot) ->
    Logger.debug "Registering ARDrone adaptor and drivers for #{robot.name}"
    robot.registerAdaptor 'cylon-ardrone', 'ardrone'
    robot.registerDriver 'cylon-ardrone', 'ardrone'
    #robot.registerDriver 'cylon-ardrone', 'ardroneNav'
    #robot.registerDriver 'cylon-ardrone', 'ardroneVideo'
