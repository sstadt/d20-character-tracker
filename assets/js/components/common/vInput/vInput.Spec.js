
var vInputComponent = require('./vInputComponent.js');

describe('The vInput component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(vInputComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
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
    });

    describe('label', function () {
      it('should exist', function () {
          expect(component.props.label).toEqual(jasmine.any(Object));
      });

      it('should be a string', function () {
        expect(component.props.label.type).toEqual(String);
      });
    });

    describe('value', function () {
      it('should exist', function () {
          expect(component.props.value).toEqual(jasmine.any(Object));
      });

      it('should be required', function () {
        expect(component.props.value.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.value.twoWay).toEqual(true);
      });
    });
  });

});
