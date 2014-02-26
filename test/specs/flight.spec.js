"use strict";

var EventEmitter = require('events').EventEmitter,
    Flight = source('flight');

describe('Cylon.Drivers.ARDrone.Flight', function() {
  var driver = new Flight({ device: new EventEmitter });

  it("provides a 'forward' function", function() {
    expect(driver.forward).to.be.a('function');
  });

  it("provides a 'frontFlip' function", function() {
    expect(driver.frontFlip).to.be.a('function');
  });

  it("provides a 'backFlip' function", function() {
    expect(driver.backFlip).to.be.a('function');
  });

  it("provides a 'leftFlip' function", function() {
    expect(driver.leftFlip).to.be.a('function');
  });

  it("provides a 'rightFlip' function", function() {
    expect(driver.rightFlip).to.be.a('function');
  });

  it("provides a 'wave' function", function() {
    expect(driver.wave).to.be.a('function');
  });
});
