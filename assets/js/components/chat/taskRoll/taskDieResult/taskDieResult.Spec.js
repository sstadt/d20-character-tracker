
var taskDieResultComponent = require('./taskDieResultComponent.js');

Vue.config.silent = true;

describe('The taskDieResult component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(taskDieResultComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('type', function () {
      it('should be a string', function () {
        expect(component.props.type.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.type.required).toEqual(true);
      });
    });

    describe('result', function () {
      it('should be an object', function () {
        expect(component.props.result.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(component.props.result.required).toEqual(true);
      });
    });
  });

});
