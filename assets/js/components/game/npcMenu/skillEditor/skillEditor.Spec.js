
var skillEditorComponent = require('./skillEditorComponent.js');

Vue.config.silent = true;

describe('The skillEditor component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(skillEditorComponent);
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
        spyOn(componentInstance, '$emit');
        componentInstance.increment('foo');
      });

      it('should emit an increment event with the name of the passe sin skill', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('increment', 'foo');
      });
    });

    describe('#decrement', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.decrement('foo');
      });

      it('should emit a decrement event with the name of the passe sin skill', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('decrement', 'foo');
      });
    });
  });

});
