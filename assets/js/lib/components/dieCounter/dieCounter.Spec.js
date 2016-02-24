
define([
  'vue.min',
  'component/dieCounter/dieCounterComponent'
], function (Vue, dieCounterComponent) {

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

        // count.type returns a function ?!?!?!?
        // it('should be a number', function () {
        //   console.log(component.props.count.type);
        //   expect(component.props.count.type).toEqual(jasmine.any(Number));
        // });

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

});
