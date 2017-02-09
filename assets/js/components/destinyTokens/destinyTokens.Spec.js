
var destinyTokensComponent = require('./destinyTokensComponent.js');

Vue.config.silent = true;

describe('The destinyTokens component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(destinyTokensComponent);
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

    describe('isGameMaster', function () {
      it('should be a boolean', function () {
        expect(component.props.isGameMaster.type).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.isGameMaster.defaultsTo).toEqual(false);
      });
    });

    describe('light', function () {
      it('should be a number', function () {
        expect(component.props.light.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.light.required).toEqual(true);
      });
    });

    describe('dark', function () {
      it('should be a number', function () {
        expect(component.props.dark.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.dark.required).toEqual(true);
      });
    });
  });

  describe('components', function () {
    it('should have a token component', function () {
      expect(component.components.token).toEqual(jasmine.any(Object));
    });
  });

});
