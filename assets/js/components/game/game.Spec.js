
var Vue = require('vue');
var gameComponent = require('./gameComponent.js');

describe('The game component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(gameComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('gameId', function () {
      it('should be a string', function () {
        expect(component.props.gameId.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.gameId.required).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    // describe('#sayHi', function () {
    //   it('should be a function', function () {
    //     expect(typeof componentInstance.sayHi).toBe('function');
    //   });
    // });
  });

});
