
var cardAbilityComponent = require('./cardAbilityComponent.js');

Vue.config.silent = true;

describe('The cardAbility component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(cardAbilityComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
