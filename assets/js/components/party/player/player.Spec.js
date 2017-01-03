
var playerComponent = require('./playerComponent.js');

Vue.config.silent = true;

describe('The player component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(playerComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  // describe('methods', function () {
  //   var componentInstance;
  //
  //   beforeEach(function () {
  //     componentInstance = new Vue(component);
  //   });
  //
  //   describe('#sayHi', function () {
  //     it('should be a function', function () {
  //       expect(typeof componentInstance.sayHi).toBe('function');
  //     });
  //   });
  // });

});
