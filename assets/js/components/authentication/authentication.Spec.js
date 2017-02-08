
var http = require('../../lib/util.http.js');

var authenticationComponent = require('./authenticationComponent.js');

Vue.config.silent = true;

describe('The authentication component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(authenticationComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      spyOn(http, 'getUrlParameter').and.returnValue(false);
      data = component.data();
    });

    describe('resetToken', function () {
      it('should be a string', function () {
        expect(data.resetToken).toEqual(jasmine.any(String));
      });
    });

    describe('view', function () {
      it('should be a string', function () {
        expect(data.view).toEqual(jasmine.any(String));
      });

      it('should default to login', function () {
        expect(data.view).toEqual('login');
      });
    });
  });

  describe('computed', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    describe('#currentView', function () {
      beforeEach(function () {
        componentInstance.setView('foo');
      });

      it('should be equal to the current view', function () {
        expect(componentInstance.currentView).toEqual(componentInstance.view);
      });
    });
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

      it('should be a function', function () {
        expect(typeof componentInstance.setView).toBe('function');
      });

      it('should set the current view', function () {
        expect(componentInstance.view).toEqual('foo');
      });
    });
  });

});
