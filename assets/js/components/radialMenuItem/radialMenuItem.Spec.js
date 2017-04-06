
var radialMenuItemComponent = require('./radialMenuItemComponent.js');

Vue.config.silent = true;

describe('The radialMenuItem component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(radialMenuItemComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#select', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.select();
      });

      it('should emit a selected event', function () {
        expect(componentInstance.$emit).toHaveBeenCalled();
      });
    });
  });

});
