"use strict";

var ARDrone = source('ardrone'),
    Commands = source('commands');

var LibARDrone = require('ar-drone');

describe('Cylon.Adaptors.Ardrone', function() {
  var drone = new ARDrone({
    device: {},
    connection: {
      port: '127.0.0.1',
      emit: spy()
    }
  });

  describe("constructor", function() {
    it("sets @ardrone to null", function() {
      expect(drone.ardrone).to.be.eql(null);
    });

    it("sets @connector to null", function() {
      expect(drone.connector).to.be.eql(null);
    });
  });

  describe("#commands", function() {
    var commands = drone.commands;

    it("is an array of strings", function() {
      expect(commands).to.be.an('array');

      commands.forEach(function(command) {
        expect(command).to.be.a('string');
      });
    });

    it("is equal to the Commands module", function() {
      expect(commands).to.be.eql(Commands);
    });
  });

  describe("#connect", function() {
    var mockDrone = {},
        callback = spy();

    beforeEach(function() {
      stub(LibARDrone, 'createClient').returns(mockDrone);

      stub(drone, 'defineAdaptorEvent');
      stub(drone, 'proxyMethods');

      drone.connect(callback);
    });

    afterEach(function() {
      LibARDrone.createClient.restore();

      drone.defineAdaptorEvent.restore();
      drone.proxyMethods.restore();
    });

    it("creates a new ARDrone instance", function() {
      expect(LibARDrone.createClient).to.be.calledWith({ ip: '127.0.0.1'});
    });

    it("sets @connector to the returned ARDrone instance", function() {
      expect(drone.connector).to.be.eql(mockDrone);
    });

    it("proxies the commands from the adaptor to the connector", function() {
      expect(drone.proxyMethods).to.be.calledWith(Commands, mockDrone, drone);
    });

    it("defines adaptor events for the ARDrone", function() {
      var events = [
        'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
        'lowBattery', 'batteryChange', 'altitudeChange'
      ];

      events.forEach(function(e) {
        expect(drone.defineAdaptorEvent).to.be.calledWith(e);
      });
    });
  });
});
