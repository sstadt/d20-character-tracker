
var partyComponent = require('./partyComponent.js');

Vue.config.silent = true;

describe('The party component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(partyComponent);
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

    describe('game', function () {
      it('should be a object', function () {
        expect(component.props.game.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(component.props.game.required).toEqual(true);
      });
    });
  });

  describe('components', function () {
    it('should have a player component', function () {
      expect(component.components.player).toEqual(jasmine.any(Object));
    });
  });

});
