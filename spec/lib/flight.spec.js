/* jshint expr:true */
"use strict";

var Flight = source("flight");

describe("Cylon.Drivers.ARDrone.Flight", function() {
  var driver;
  var ardrone = { _ref: { emergency: false } };

  beforeEach(function() {
    driver = new Flight({
      connection: {
        animate: spy(),
        front: spy(),
        stop: spy(),
        ftrim: spy(),
        ardrone: ardrone
      }
    });
  });

  describe("#commands", function() {
    it("contains snake_cased versions of all ARDrone commands", function() {
      var commands = driver.commands;
      expect(commands).to.be.a("object");

      for (var c in commands) {
        var command = commands[c];
        expect(c).to.be.a("string");
        expect(c).to.match(/^[a-z_]*$/);
        expect(command).to.be.a("function");
      }
    });
  });

  describe("proxies", function() {
    describe("#hover", function() {
      it("tells the drone to stop", function() {
        driver.hover();
        expect(driver.connection.stop).to.be.called;
      });
    });

    describe("#forward", function() {
      it("tells the drone to move forward", function() {
        driver.forward(1);
        expect(driver.connection.front).to.be.calledWith(1);
      });
    });

    describe("#frontFlip", function() {
      it("tells the drone to do a front flip", function() {
        driver.frontFlip();
        expect(driver.connection.animate).to.be.calledWith("flipAhead", 150);
      });
    });

    describe("#backFlip", function() {
      it("tells the drone to do a back flip", function() {
        driver.backFlip();
        expect(driver.connection.animate).to.be.calledWith("flipBehind", 150);
      });
    });

    describe("#leftFlip", function() {
      it("tells the drone to do a left flip", function() {
        driver.leftFlip();
        expect(driver.connection.animate).to.be.calledWith("flipLeft", 150);
      });
    });

    describe("#rightFlip", function() {
      it("tells the drone to do a right flip", function() {
        driver.rightFlip();
        expect(driver.connection.animate).to.be.calledWith("flipRight", 150);
      });
    });

    describe("#wave", function() {
      it("tells the drone to wave", function() {
        driver.wave();
        expect(driver.connection.animate).to.be.calledWith("wave", 750);
      });
    });

    describe("#ftrim", function() {
      it("tells the drone to perform a flat trim", function() {
        driver.ftrim();
        expect(driver.connection.ftrim).to.be.called;
      });
    });
  });

  describe("#enableEmergency", function() {
    it("tells the drone to enter emergency mode (cut engines)", function() {
      driver.enableEmergency();
      expect(driver.connection.ardrone._ref.emergency).to.equal(true);
    });
  });
});
