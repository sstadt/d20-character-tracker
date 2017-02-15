
var Pipe = require('./Pipe.js');

describe('The Pipe class', function () {
  var pipe, socket;

  beforeEach(function () {
    pipe = new Pipe('game');
  });

  it('to be an object', function () {
    expect(pipe).toEqual(jasmine.any(Object));
  });

  describe('constructor', function () {
    it('should return an object', function () {
      expect(pipe).toEqual(jasmine.any(Object));
    });

    it('should include a handlers parameter that is an object', function () {
      expect(pipe.handlers).toEqual(jasmine.any(Object));
    });
  });

  describe('methods', function () {

    describe('#on', function () {
      var spy = jasmine.createSpy('test handler');

      beforeEach(function () {
        pipe.on('foo', spy);
      });

      it('should add the provided function to handlers with the provided name', function () {
        expect(pipe.handlers.foo).toEqual(jasmine.any(Function));
      });

      // TODO: need to figure out how to mock a socket update being received by io.socket.on
      // it('should call the handler function when receiving an event with the provided handler name', function () {
      //   io.socket.emit('message', { data: { type: 'foo', data: { foo: 'bar' } } });
      //   expect(spy).toHaveBeenCalledWith({ foo: 'bar' });
      // });
    });
  });

});
