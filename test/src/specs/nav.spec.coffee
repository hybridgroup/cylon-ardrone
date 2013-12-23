'use strict'

source 'nav'
EventEmitter = require('events').EventEmitter

describe 'Cylon.Drivers.ARDrone.Nav', ->
  nav = new Cylon.Drivers.ARDrone.Nav
    device: new EventEmitter

  it "defines driver events on 'start' function", ->
    events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
              'lowBattery', 'batteryChange', 'altitudeChange', 'update']

    spy = sinon.spy()
    nav.defineDriverEvent = spy
    nav.start ->
    assert(spy.calledWith(eventName: event)) for event in events
