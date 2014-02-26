"use strict";

var ardrone = source("cylon-ardrone");

describe("Cylon.ARDrone", function() {
  it("can register", function() {
    expect(ardrone.register).to.be.a('function');
  });

  it("can create an adaptor", function() {
    expect(ardrone.adaptor()).to.be.a('object');
  });

  it("can create a driver", function() {
    expect(ardrone.driver({ name: 'ardrone', device: {} })).to.be.a('object');
  });
});
