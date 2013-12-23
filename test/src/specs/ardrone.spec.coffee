'use strict'

source 'ardrone'

EventEmitter = require('events').EventEmitter

describe 'Cylon.Adaptors.Ardrone', ->
  adaptor = new Cylon.Adaptors.ARDrone

  it "exposes a 'connect' method", ->
    expect(adaptor.connect).to.be.a 'function'

  it "exposes an array of drone commands", ->
    expect(adaptor.commands()).to.be.an 'array'
    expect(command).to.be.a 'string' for command in adaptor.commands()

  it "defines adaptor events on the 'connect' method", ->
    spy = sinon.spy()
    adaptor.defineAdaptorEvent = spy
    adaptor.connection = new EventEmitter
    adaptor.connection.port = { toString: -> "192.168.1.1" }
    adaptor.connect ->

    events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
              'lowBattery', 'batteryChange', 'altitudeChange']

    assert spy.calledWith(eventName: event) for event in events
