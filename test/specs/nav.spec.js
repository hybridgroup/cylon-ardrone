'use strict';

var EventEmitter = require('events').EventEmitter;

var Nav = source('nav');

describe('Cylon.Drivers.ARDrone.Nav', function() {
  var driver = new Nav({ device: new EventEmitter });

  it("defines driver events on 'start' function", function() {
    var events = [
      'navdata', 'landing', 'landed', 'takeoff', 'hovering', 'flying',
      'lowBattery', 'batteryChange', 'altitudeChange', 'update'
    ];

    stub(driver, 'defineDriverEvent');
    driver.start(function() {});

    for (var i = 0; i < events.length; i++) {
      expect(driver.defineDriverEvent).to.be.calledWith({
        eventName: events[i]
      });
    }
  });
});
