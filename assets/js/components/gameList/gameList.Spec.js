
var gameListComponent = require('./gameListComponent.js');

Vue.config.silent = true;

describe('The gameList component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(gameListComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('games', function () {
      it('should be an array', function () {
        expect(component.props.games.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.games.required).toEqual(true);
      });
    });
  });

});
