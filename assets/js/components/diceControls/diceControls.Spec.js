
var diceControlsComponent = require('./diceControlsComponent.js');

Vue.config.silent = true;

describe('The diceControls component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(diceControlsComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('components', function () {
    it('should have a dieControl component', function () {
      expect(component.components.dieControl).toEqual(jasmine.any(Object));
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#dieClick', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.dieClick('ability');
      });

      it('should emit a die-click event with the provided type', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('die-click', 'ability');
      });
    });
  });

});
