
define([
  'vue.min',
  'component/common/alert/alertComponent'
], function (Vue, alertComponent) {

  describe('The alert component', function () {
    var component;

    beforeEach(function () {
      component = _.clone(alertComponent);
    });

    it('to be an object', function () {
      expect(component).toEqual(jasmine.any(Object));
    });

    it('should have a template', function () {
      expect(component.template).toEqual(jasmine.any(String));
    });

    describe('props', function () {
      describe('messages', function () {
        it('should exist', function () {
            expect(component.props.messages).toEqual(jasmine.any(Object));
        });

        it('should be a array', function () {
          expect(component.props.messages.type).toEqual(Array);
        });

        it('should be required', function () {
          expect(component.props.messages.required).toEqual(true);
        });

        it('should be a two way binding', function () {
          expect(component.props.messages.twoWay).toEqual(true);
        });
      });

      describe('type', function () {
        it('should exist', function () {
            expect(component.props.type).toEqual(jasmine.any(Object));
        });

        it('should be a string', function () {
          expect(component.props.type.type).toEqual(String);
        });

        it('should be required', function () {
          expect(component.props.type.required).toEqual(true);
        });

        it('should be a two way binding', function () {
          expect(component.props.type.twoWay).toEqual(true);
        });
      });
    });

    describe('methods', function () {
      var componentInstance;

      beforeEach(function () {
        componentInstance = new Vue(component);
      });

      describe('#close', function () {
        it('should be a function', function () {
          expect(typeof componentInstance.close).toBe('function');
        });

        it('should clear the messages in the alert', function () {
          componentInstance.messages = ['test'];
          componentInstance.close();

          expect(componentInstance.messages).toEqual([]);
        });
      });
    });

  });

});
