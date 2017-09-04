
var charactersComponent = require('./charactersComponent.js');

Vue.config.silent = true;

describe('The characters component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(charactersComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

});
