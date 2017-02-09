
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

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('player', function () {
      it('should be a object', function () {
        expect(component.props.player.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(component.props.player.required).toEqual(true);
      });
    });

    describe('online', function () {
      it('should be a object', function () {
        expect(component.props.online.type).toEqual(Array);
      });

      it('should default to an empty array', function () {
        expect(component.props.online.defaultsTo).toEqual([]);
      });
    });
  });

});
