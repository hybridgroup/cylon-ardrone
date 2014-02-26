(function() {
  'use strict';
  var EventEmitter;

  source('ardrone');

  EventEmitter = require('events').EventEmitter;

  describe('Cylon.Adaptors.Ardrone', function() {
    var adaptor;
    adaptor = new Cylon.Adaptors.ARDrone;
    it("exposes a 'connect' method", function() {
      return expect(adaptor.connect).to.be.a('function');
    });
    it("exposes an array of drone commands", function() {
      var command, _i, _len, _ref, _results;
      expect(adaptor.commands()).to.be.an('array');
      _ref = adaptor.commands();
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        command = _ref[_i];
        _results.push(expect(command).to.be.a('string'));
      }
      return _results;
    });
    return it("defines adaptor events on the 'connect' method", function() {
      var event, events, spy, _i, _len, _results;
      spy = sinon.spy();
      adaptor.defineAdaptorEvent = spy;
      adaptor.connection = new EventEmitter;
      adaptor.connection.port = {
        toString: function() {
          return "192.168.1.1";
        }
      };
      adaptor.connect(function() {});
      events = ['navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying', 'lowBattery', 'batteryChange', 'altitudeChange'];
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
