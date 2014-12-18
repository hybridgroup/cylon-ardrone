/* jshint expr:true */
"use strict";

var ARDrone = source("ardrone"),
    Commands = source("commands");

var LibARDrone = require("ar-drone");

describe("Cylon.Adaptors.Ardrone", function() {
  var drone;

  beforeEach(function() {
    drone = new ARDrone({
      device: {},
      port: "127.0.0.1"
    });
  });

  describe("constructor", function() {
    it("sets @ardrone to null", function() {
      expect(drone.ardrone).to.be.eql(null);
    });

    it("sets @connector to null", function() {
      expect(drone.connector).to.be.eql(null);
    });

    describe("@ip", function() {
      context("if opts.host is provided", function() {
        it("is set to opts.host", function() {
          drone = new ARDrone({
            host: "host"
          });

          expect(drone.ip).to.be.eql("host");
        });
      });

      context("if opts.host and opts.port are provided", function() {
        it("is set to opts.host", function() {
          drone = new ARDrone({
            host: "host",
            port: "port",
          });

          expect(drone.ip).to.be.eql("host");
        });
      });

      context("if opts.port is provided", function() {
        it("is set to opts.port", function() {
          drone = new ARDrone({
            port: "port",
          });

          expect(drone.ip).to.be.eql("port");
        });
      });

      context("if neither is provided", function() {
        it("is set to 192.168.1.1", function() {
          drone = new ARDrone({
          });

          expect(drone.ip).to.be.eql("192.168.1.1");
        });
      });
    });
  });

  describe("#connect", function() {
    var mockDrone = {},
        callback = spy();

    beforeEach(function() {
      stub(LibARDrone, "createClient").returns(mockDrone);

      stub(drone, "defineAdaptorEvent");
      stub(drone, "proxyMethods");

      drone.connect(callback);
    });

    afterEach(function() {
      LibARDrone.createClient.restore();

      drone.defineAdaptorEvent.restore();
      drone.proxyMethods.restore();
    });

    it("creates a new ARDrone instance", function() {
      expect(LibARDrone.createClient).to.be.calledWith({ ip: "127.0.0.1"});
    });

    it("sets @connector to the returned ARDrone instance", function() {
      expect(drone.connector).to.be.eql(mockDrone);
    });

    it("proxies the commands from the adaptor to the connector", function() {
      expect(drone.proxyMethods).to.be.calledWith(Commands, mockDrone, drone);
    });

    it("defines adaptor events for the ARDrone", function() {
      var events = [
        "navdata", "landing", "landed", "takeoff", "hovering", "flying",
        "lowBattery", "batteryChange", "altitudeChange"
      ];

      events.forEach(function(e) {
        expect(drone.defineAdaptorEvent).to.be.calledWith(e);
      });
    });
  });
});
