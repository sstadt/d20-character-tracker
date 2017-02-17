
var npcMenuComponent = require('./npcMenuComponent.js');

Vue.config.silent = true;

describe('The npcMenu component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(npcMenuComponent);
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

    describe('#setView', function () {
      beforeEach(function () {
        componentInstance.setView('foo');
      });

      it('should set the current view to the passed in parameter', function () {
        expect(componentInstance.view).toEqual('foo');
      });
    });
  });

});
