(function() {
  'use strict';
  var EventEmitter;

  source('flight');

  EventEmitter = require('events').EventEmitter;

  describe('Cylon.Drivers.ARDrone.Flight', function() {
    var flight;
    flight = new Cylon.Drivers.ARDrone.Flight({
      device: new EventEmitter
    });
    it("provides a 'forward' function", function() {
      return expect(flight.forward).to.be.a('function');
    });
    it("provides a 'frontFlip' function", function() {
      return expect(flight.frontFlip).to.be.a('function');
    });
    it("provides a 'backFlip' function", function() {
      return expect(flight.backFlip).to.be.a('function');
    });
    it("provides a 'leftFlip' function", function() {
      return expect(flight.leftFlip).to.be.a('function');
    });
    it("provides a 'rightFlip' function", function() {
      return expect(flight.rightFlip).to.be.a('function');
    });
    return it("provides a 'wave' function", function() {
      return expect(flight.wave).to.be.a('function');
    });
  });

}).call(this);
