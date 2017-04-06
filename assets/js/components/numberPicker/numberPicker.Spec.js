
var numberPickerComponent = require('./numberPickerComponent.js');

Vue.config.silent = true;

describe('The numberPicker component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(numberPickerComponent);
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

    describe('#increment', function () {
      beforeEach(function () {
        componentInstance.innerValue = 5;
        componentInstance.increment();
      });

      it('should increment the value', function () {
        expect(componentInstance.innerValue).toEqual(6);
      });
    });

    describe('#decrement', function () {
      it('should decrement the value', function () {
        componentInstance.innerValue = 5;
        componentInstance.decrement();
        expect(componentInstance.innerValue).toEqual(4);
      });

      it('should not decrement if the value would drop below 0', function () {
        componentInstance.innerValue = 0;
        componentInstance.decrement();
        expect(componentInstance.innerValue).toEqual(0);
      });
    });
  });

});
