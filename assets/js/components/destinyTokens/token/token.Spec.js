
var tokenComponent = require('./tokenComponent.js');

Vue.config.silent = true;

describe('The token component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(tokenComponent);
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

    describe('totalTokens', function () {
      it('should be a boolean', function () {
        expect(component.props.totalTokens.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.totalTokens.required).toEqual(true);
      });
    });

    describe('index', function () {
      it('should be a number', function () {
        expect(component.props.index.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.index.required).toEqual(true);
      });
    });

    describe('type', function () {
      it('should be a string', function () {
        expect(component.props.type.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.type.required).toEqual(true);
      });
    });

    describe('spacing', function () {
      it('should be a string', function () {
        expect(component.props.spacing.type).toEqual(Number);
      });

      it('should be required', function () {
        expect(component.props.spacing.required).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance, dragEvent;

    beforeEach(function () {
      dragEvent = { dataTransfer: { setData: jasmine.createSpy('dataTransfer.setData') } };
      component.propsData = { type: 'light' };
      componentInstance = new Vue(component);
    });

    describe('#dragStart', function () {
      beforeEach(function () {
        componentInstance.dragStart(dragEvent);
      });

      it('should set a token to the dataTransfer object', function () {
        expect(dragEvent.dataTransfer.setData).toHaveBeenCalledWith('text/plain', 'light-token');
      });
    });
  });

});
