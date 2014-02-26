"use strict";

var EventEmitter = require('events').EventEmitter,
    ARDrone = source('ardrone');

describe('Cylon.Adaptors.Ardrone', function() {
  var adaptor = new ARDrone;

  it("exposes a 'connect' method", function() {
    expect(adaptor.connect).to.be.a('function');
  });

  it("exposes an array of drone commands", function() {
    var commands = adaptor.commands();
    expect(commands).to.be.an('array');

    for (var i = 0; i < commands.length; i++) {
      expect(commands[i]).to.be.a('string');
    }
  });

  it("defines adaptor events on the 'connect' method", function() {
    adaptor.defineAdaptorEvent = spy();
    adaptor.connection = new EventEmitter;
    adaptor.connection.port = { toString: function() { "192.168.1.1"; } };

    adaptor.connect(function() {});

    var events = [
      'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
      'lowBattery', 'batteryChange', 'altitudeChange'
    ];

    for (var i = 0; i < events.length; i++) {
      assert(adaptor.defineAdaptorEvent.calledWith({ eventName: events[i] }))
    }
  });
});
