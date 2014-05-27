'use strict';

var module = source('cylon-ardrone');

var ARDrone = source('ardrone'),
    Flight = source('flight'),
    Nav = source('nav');

describe('cylon-ardrone', function() {
  describe('#register', function() {
    var bot;

    before(function() {
      bot = { registerAdaptor: spy(), registerDriver: spy() };
      module.register(bot);
    });

    it('registers the ardrone adaptor with the passed Robot', function() {
      expect(bot.registerAdaptor).to.be.calledWith('cylon-ardrone', 'ardrone');
    });

    it('registers the ardrone driver with the passed Robot', function() {
      expect(bot.registerDriver).to.be.calledWith('cylon-ardrone', 'ardrone');
    });

    it('registers the ardroneNav driver with the passed Robot', function() {
      expect(bot.registerDriver).to.be.calledWith('cylon-ardrone', 'ardroneNav');
    });
  });

  describe("#adaptor", function() {
    it('returns a new ARDrone adaptor instance', function() {
      expect(module.adaptor({})).to.be.an.instanceOf(ARDrone);
    });
  });

  describe("#driver", function() {
    var args;

    beforeEach(function() {
      args = { device: {} };
    });

    context("when passed 'ardrone'", function() {
      beforeEach(function() {
        args.name = 'ardrone';
      });

      it("returns an instance of the Flight driver", function() {
        expect(module.driver(args)).to.be.an.instanceOf(Flight);
      });
    });

    context("when passed 'ardroneNav'", function() {
      beforeEach(function() {
        args.name = 'ardroneNav';
      });

      it("returns an instance of the Nav driver", function() {
        expect(module.driver(args)).to.be.an.instanceOf(Nav);
      });
    });

    context("when passed another value", function() {
      it("returns null", function() {
        expect(module.driver()).to.be.eql(null);
      });
    });
  });
});
