/* jshint expr:true */
"use strict";

var mod = source("cylon-ardrone");

var ARDrone = source("ardrone"),
    Flight = source("flight"),
    Nav = source("nav");

describe("cylon-ardrone", function() {

  describe("#adaptors", function() {
    it("is an array of supplied adaptors", function() {
      expect(mod.adaptors).to.be.eql(["ardrone"]);
    });
  });

  describe("#drivers", function() {
    it("is an array of supplied drivers", function() {
      expect(mod.drivers).to.be.eql(["ardrone", "ardrone-nav"]);
    });
  });

  describe("#adaptor", function() {
    it("returns a new ARDrone adaptor instance", function() {
      expect(mod.adaptor({})).to.be.an.instanceOf(ARDrone);
    });
  });

  describe("#driver", function() {
    var args;

    beforeEach(function() {
      args = { connection: {} };
    });

    context("when passed 'ardrone'", function() {
      beforeEach(function() {
        args.driver = "ardrone";
      });

      it("returns an instance of the Flight driver", function() {
        expect(mod.driver(args)).to.be.an.instanceOf(Flight);
      });
    });

    context("when passed 'ardroneNav'", function() {
      beforeEach(function() {
        args.driver = "ardrone-nav";
      });

      it("returns an instance of the Nav driver", function() {
        expect(mod.driver(args)).to.be.an.instanceOf(Nav);
      });
    });

    context("when passed another value", function() {
      it("returns null", function() {
        expect(mod.driver()).to.be.eql(null);
      });
    });
  });
});
