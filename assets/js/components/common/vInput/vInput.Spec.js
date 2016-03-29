
var Vue = require('vue');
var vInputComponent = require('./vInputComponent.js');

describe('The vInput component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(vInputComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('label', function () {
      it('should be a string', function () {
        expect(component.props.label.type).toEqual(String);
      });
    });

    describe('name', function () {
      if('should be a string', function () {
        expect(component.props.name).toEqual(String);
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

    describe('placeholder', function () {
      if('should be a string', function () {
        expect(component.props.placeholder).toEqual(String);
      });
    });

    describe('icon', function () {
      if('should be a string', function () {
        expect(component.props.icon).toEqual(String);
      });
    });

    describe('value', function () {
      if('should be a string', function () {
        expect(component.props.value).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.value.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.value.twoWay).toEqual(true);
      });
    });

    describe('required', function () {
      if('should be a string', function () {
        expect(component.props.required).toEqual(Boolean);
      });

      it('should default to false', function () {
        expect(component.props.required.defaultTo).toEqual(false);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#isValid', function () {
      beforeEach(function () {
        spyOn(componentInstance, 'validate').and.callThrough();
      });

      it('should call the validate method anc set validated', function () {
        componentInstance.isValid();
        expect(componentInstance.validated).toEqual(true);
        expect(componentInstance.validate).toHaveBeenCalled();
      });

      describe('when required', function () {
        beforeEach(function () {
          componentInstance.required = true;
          componentInstance.type = 'text';
        });

        it('should return false when not populated', function () {
          componentInstance.value = '';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true when populated', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is email', function () {
        beforeEach(function () {
          componentInstance.type = 'email';
        });

        it('should return false with an invalid email', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid email', function () {
          componentInstance.value = 'foo@bar.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });

      describe('when type is url', function () {
        beforeEach(function () {
          componentInstance.type = 'url';
        });

        it('should return false with an invalid url', function () {
          componentInstance.value = 'foo';
          expect(componentInstance.isValid()).toEqual(false);
        });

        it('should return true with a valid url', function () {
          componentInstance.value = 'http://www.foo.com';
          expect(componentInstance.isValid()).toEqual(true);
        });
      });
    });

    describe('#validate', function () {
      it('should perform validation and set the valid flag', function () {
        // do stuff
      });
    });
  });

});
