(function() {
  'use strict';
  var EventEmitter;

  source('nav');

  EventEmitter = require('events').EventEmitter;

  describe('Cylon.Drivers.ARDrone.Nav', function() {
    var nav;
    nav = new Cylon.Drivers.ARDrone.Nav({
      device: new EventEmitter
    });
    return it("defines driver events on 'start' function", function() {
      var event, events, spy, _i, _len, _results;
      events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying', 'lowBattery', 'batteryChange', 'altitudeChange', 'update'];
      spy = sinon.spy();
      nav.defineDriverEvent = spy;
      nav.start(function() {});
      _results = [];
      for (_i = 0, _len = events.length; _i < _len; _i++) {
        event = events[_i];
        _results.push(assert(spy.calledWith({
          eventName: event
        })));
      }
      return _results;
    });
  });

}).call(this);
