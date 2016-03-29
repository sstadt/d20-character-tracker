
var Vue = require('vue');

var constants = require('../../../config/constants.js');
var promptComponent = require('./promptComponent.js');

Vue.config.silent = true;

describe('The prompt component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(promptComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  // describe('props', function () {
  //   describe('name', function () {
  //     it('should exist', function () {
  //       expect(component.props.name).toEqual(jasmine.any(Object));
  //     });
  //
  //     it('should be a string', function () {
  //       expect(component.props.name.type).toEqual(String);
  //     });
  //
  //     it('should be required', function () {
  //       expect(component.props.name.required).toEqual(true);
  //     });
  //   });
  //
  //   describe('label', function () {
  //     it('should exist', function () {
  //       expect(component.props.label).toEqual(jasmine.any(Object));
  //     });
  //
  //     it('should be a string', function () {
  //       expect(component.props.label.type).toEqual(String);
  //     });
  //
  //     it('should be required', function () {
  //       expect(component.props.label.required).toEqual(true);
  //     });
  //   });
  // });
  //
  // describe('data', function () {
  //   var data;
  //
  //   beforeEach(function () {
  //     data = component.data();
  //   });
  //
  //   it('should set promptValue to an empty string', function () {
  //     expect(data.promptValue).toEqual('');
  //   });
  //
  //   it('should set show to false', function () {
  //     expect(data.show).toEqual(false);
  //   });
  // });
  //
  // describe('methods', function () {
  //   var componentInstance;
  //
  //   beforeEach(function () {
  //     componentInstance = new Vue(component);
  //   });
  //
  //   describe('#submit', function () {
  //     beforeEach(function () {
  //       componentInstance.show = true;
  //     });
  //
  //     describe('with a prompt value', function () {
  //       beforeEach(function (done) {
  //         componentInstance.promptValue = 'test';
  //         componentInstance.submit();
  //         setTimeout(done, 301);
  //       });
  //
  //       it('should hide the prompt', function () {
  //         expect(componentInstance.show).toEqual(false);
  //       });
  //
  //       it('should reset the prompt value after the animation completes', function () {
  //         expect(componentInstance.promptValue).toEqual('');
  //       });
  //     });
  //
  //     describe('with an empty prompt value', function () {
  //       beforeEach(function (done) {
  //         componentInstance.promptValue = '';
  //         componentInstance.submit();
  //         setTimeout(done, 301);
  //       });
  //
  //       it('should not hide the prompt', function () {
  //         expect(componentInstance.show).toEqual(true);
  //       });
  //     });
  //   });
  //
  //   describe('#cancel', function () {
  //     beforeEach(function () {
  //       componentInstance.promptValue = 'test';
  //       componentInstance.show = true;
  //       componentInstance.cancel();
  //     });
  //
  //     it('should close the prompt', function () {
  //       expect(componentInstance.show).toEqual(false);
  //     });
  //
  //     it('should not reset the prompt value', function () {
  //       expect(componentInstance.promptValue).toEqual('test');
  //     });
  //   });
  // });

});
