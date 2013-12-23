'use strict'

source 'flight'
EventEmitter = require('events').EventEmitter

describe 'Cylon.Drivers.ARDrone.Flight', ->
  flight = new Cylon.Drivers.ARDrone.Flight
    device: new EventEmitter

  it "provides a 'forward' function", ->
    expect(flight.forward).to.be.a 'function'

  it "provides a 'frontFlip' function", ->
    expect(flight.frontFlip).to.be.a 'function'

  it "provides a 'backFlip' function", ->
    expect(flight.backFlip).to.be.a 'function'

  it "provides a 'leftFlip' function", ->
    expect(flight.leftFlip).to.be.a 'function'

  it "provides a 'rightFlip' function", ->
    expect(flight.rightFlip).to.be.a 'function'

  it "provides a 'wave' function", ->
    expect(flight.wave).to.be.a 'function'
