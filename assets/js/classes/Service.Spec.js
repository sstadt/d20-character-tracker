
var config = require('../lib/config.js');

var Service = require('./Service.js');

describe('The Service class', function () {
  var service, socket;

  beforeEach(function () {
    spyOn(io.socket, 'get');
    spyOn(io.socket, 'post');
  });

  describe('with defined static data', function () {
    beforeEach(function () {
      service = new Service({
        schema: config.endpoints.auth,
        staticData: {
          foo: 'bar'
        }
      });
    });

    it('to be an object', function () {
      expect(service).toEqual(jasmine.any(Object));
    });

    describe('constructor', function () {
      it('should return an object', function () {
        expect(service).toEqual(jasmine.any(Object));
      });

      it('should include a function for every endpoint in the passed in schema', function () {
        for (var endpoint in config.endpoints.auth) {
          expect(service[endpoint]).toEqual(jasmine.any(Function));
        }
      });
    });

    describe('methods', function () {
      var method = Object.keys(config.endpoints.auth)[0]; // test on the first endpoint in the config

      it('should return a deferred', function () {
        expect(service[method]().then).toEqual(jasmine.any(Function));
      });

      describe('when not passing additional data', function () {
        beforeEach(function () {
          service[method]();
        });

        it('should make a socket post call with the endpoint, the static data, and callback function', function () {
          expect(io.socket.post).toHaveBeenCalledWith(config.endpoints.auth[method], { foo: 'bar' }, jasmine.any(Function));
        });
      });

      describe('when passing additional data', function () {
        beforeEach(function () {
          service[method]({ bar: 'baz' });
        });

        it('should make a socket post call with the endpoint, the combined data, and callback function', function () {
          expect(io.socket.post).toHaveBeenCalledWith(config.endpoints.auth[method], { foo: 'bar', bar: 'baz' }, jasmine.any(Function));
        });
      });
    });
  });

  describe('without defined static data', function () {
    beforeEach(function () {
      service = new Service({ schema: config.endpoints.auth });
    });

    describe('methods', function () {
      var method = Object.keys(config.endpoints.auth)[0]; // test on the first endpoint in the config

      it('should return a deferred', function () {
        expect(service[method]().then).toEqual(jasmine.any(Function));
      });

      describe('when not passing additional data', function () {
        beforeEach(function () {
          service[method]();
        });

        it('should make a socket get call with the endpoint and callback function', function () {
          expect(io.socket.get).toHaveBeenCalledWith(config.endpoints.auth[method], jasmine.any(Function));
        });
      });

      describe('when passing additional data', function () {
        beforeEach(function () {
          service[method]({ bar: 'baz' });
        });

        it('should make a socket post call with the endpoint, the passed in data, and callback function', function () {
          expect(io.socket.post).toHaveBeenCalledWith(config.endpoints.auth[method], { bar: 'baz' }, jasmine.any(Function));
        });
      });
    });
  });

});
