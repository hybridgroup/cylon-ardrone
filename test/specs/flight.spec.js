"use strict";

var Flight = source('flight');

describe('Cylon.Drivers.ARDrone.Flight', function() {
  var driver = new Flight({ device: {} });

  driver.connection = {
    animate: spy(),
    front: spy(),
    stop: spy()
  };

  describe("#commands", function() {
    it("returns all ARDrone commands", function() {
      var commands = driver.commands;
      expect(commands).to.be.a('array');

      for(var i = 0; i < commands.length; i++) {
        expect(commands[i]).to.be.a('string');
      };
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
        expect(driver.connection.animate).to.be.calledWith('flipAhead', 150);
      });
    });

    describe("#backFlip", function() {
      it("tells the drone to do a back flip", function() {
        driver.backFlip();
        expect(driver.connection.animate).to.be.calledWith('flipBehind', 150);
      });
    });

    describe("#leftFlip", function() {
      it("tells the drone to do a left flip", function() {
        driver.leftFlip();
        expect(driver.connection.animate).to.be.calledWith('flipLeft', 150);
      });
    });

    describe("#rightFlip", function() {
      it("tells the drone to do a right flip", function() {
        driver.rightFlip();
        expect(driver.connection.animate).to.be.calledWith('flipRight', 150);
      });
    });

    describe("#wave", function() {
      it("tells the drone to wave", function() {
        driver.wave();
        expect(driver.connection.animate).to.be.calledWith('wave', 750);
      });
    });
  });
});
