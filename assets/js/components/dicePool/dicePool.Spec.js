
var dicePoolComponent = require('./dicePoolComponent.js');

Vue.config.silent = true;

describe('The dicePool component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(dicePoolComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
