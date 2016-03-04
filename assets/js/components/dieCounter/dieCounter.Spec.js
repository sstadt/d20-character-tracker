
var Vue = require('Vue');

var dieCounterComponent = require('./dieCounterComponent.js');

Vue.config.silent = true;

describe('The dieCounter component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(dieCounterComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('count', function () {
      it('should exist', function () {
        expect(component.props.count).toEqual(jasmine.any(Object));
      });

      it('should be a number', function () {
        expect(component.props.count.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.count.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.count.twoWay).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      componentInstance.count = 0;
    });

    describe('#increment', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.increment).toBe('function');
      });

      it('should increment the count', function () {
        componentInstance.increment();
        expect(componentInstance.count).toEqual(1);
      });

      it('should not increase the count above 5', function () {
        componentInstance.count = 5;
        componentInstance.increment();
        expect(componentInstance.count).toEqual(5);
      });
    });

    describe('#decrement', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.decrement).toBe('function');
      });

      it('should decrement the count', function () {
        componentInstance.count = 2;
        componentInstance.decrement();
        expect(componentInstance.count).toEqual(1);
      });

      it('should not decrease the count below zero', function () {
        componentInstance.decrement();
        expect(componentInstance.count).toEqual(0);
      });
    });
  });

});
