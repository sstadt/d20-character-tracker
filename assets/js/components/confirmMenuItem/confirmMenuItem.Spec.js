
var confirmMenuItemComponent = require('./confirmMenuItemComponent.js');

Vue.config.silent = true;

describe('The confirmMenuItem component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(confirmMenuItemComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('delay', function () {
      it('should be a number', function () {
        expect(component.props.delay.type).toEqual(Number);
      });

      it('should default to 10 seconds', function () {
        expect(component.props.delay.default).toEqual(10000);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#confirm', function () {
      beforeEach(function () {
        componentInstance.delay = 1;
      });

      it('should set confirmed to true', function () {
        componentInstance.confirm();
        expect(componentInstance.confirmed).toEqual(true);
      });

      it('should reset confirmed to false after the specified delay', function () {
        componentInstance.confirm();
        setTimeout(function () {
          expect(componentInstance.confirmed).toEqual(false);
        }, 2);
      });
    });

    describe('#submit', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.submit();
      });

      it('should emit a submit event', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('submit');
      });
    });
  });

});
