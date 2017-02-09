
var dieControlComponent = require('./dieControlComponent.js');

Vue.config.silent = true;

describe('The dieControl component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(dieControlComponent);
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

    describe('die', function () {
      it('should be a string', function () {
        expect(component.props.die.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.die.required).toEqual(true);
      });
    });
  });

  describe('computed', function () {
    var componentInstance, isolatedComponent;

    beforeEach(function () {
      isolatedComponent = _.clone(component);
      isolatedComponent.propsData = { die: 'foo' };
      componentInstance = new Vue(isolatedComponent);
    });

    describe('icon', function () {
      it('should prepend die- to the die property', function () {
        expect(componentInstance.icon).toEqual('die-foo');
      });
    });
  });

  describe('methods', function () {
    var componentInstance, isolatedComponent;

    beforeEach(function () {
      isolatedComponent = _.clone(component);
      isolatedComponent.propsData = { die: 'foo' };
      componentInstance = new Vue(isolatedComponent);
    });

    describe('#dieClick', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.dieClick();
      });

      it('should emit a die click event', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('die-click');
      });
    });

    describe('#dragStart', function () {
      var dragEvent;

      beforeEach(function () {
        dragEvent = { dataTransfer: { setData: jasmine.createSpy() } };
        componentInstance.dragStart(dragEvent);
      });

      it('should set data on the dataTransfer object', function () {
        expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'foo');
      });
    });
  });

});
