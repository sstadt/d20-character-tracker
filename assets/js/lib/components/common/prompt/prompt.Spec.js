
define([
  'vue.min',
  'component/common/prompt/promptComponent'
], function (Vue, promptComponent) {

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

    describe('props', function () {
      describe('name', function () {
        it('should exist', function () {
          expect(component.props.name).toEqual(jasmine.any(Object));
        });

        it('should be a string', function () {
          expect(component.props.name.type).toEqual(String);
        });

        it('should be required', function () {
          expect(component.props.name.required).toEqual(true);
        });
      });

      describe('label', function () {
        it('should exist', function () {
          expect(component.props.label).toEqual(jasmine.any(Object));
        });

        it('should be a string', function () {
          expect(component.props.label.type).toEqual(String);
        });

        it('should be required', function () {
          expect(component.props.label.required).toEqual(true);
        });
      });
    });

    // describe('data', function () {
    //   beforeEach(function () {});
    // });

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

});
