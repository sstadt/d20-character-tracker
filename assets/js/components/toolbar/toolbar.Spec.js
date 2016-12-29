
var toolbarComponent = require('./toolbarComponent.js');
var authService = require('../../services/authService.js');
var http = require('../../lib/util.http.js');

Vue.config.silent = true;

describe('The toolbar component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(toolbarComponent);
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
      data = component.data();
    });

    describe('alert', function () {
      it('should be an object', function () {
        expect(data.alert).toEqual(jasmine.any(Object));
      });

      it('should have a content attribute with a string value', function () {
        expect(data.alert.content).toEqual(jasmine.any(String));
      });
    });

    describe('confirm', function () {
      it('should be an object', function () {
        expect(data.confirm).toEqual(jasmine.any(Object));
      });

      it('should have a content attribute with a string value', function () {
        expect(data.confirm.content).toEqual(jasmine.any(String));
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.$refs.toolbarDialog = {
        open: jasmine.createSpy('openDialog')
      };

      componentInstance.$refs.rightSideNav = {
        toggle: jasmine.createSpy('toggle')
      };

      componentInstance.$refs.toolbarConfirm = {
        open: jasmine.createSpy('openConfirm')
      };
    });

    describe('#toggleRightSideNav', function () {
      beforeEach(function () {
        componentInstance.toggleRightSideNav();
      });

      it('should be a function', function () {
        expect(typeof componentInstance.toggleRightSideNav).toBe('function');
      });

      it('should toggle the right side nav',function () {
        expect(componentInstance.$refs.rightSideNav.toggle).toHaveBeenCalled();
      });
    });

    describe('#logout', function () {
      beforeEach(function () {
        componentInstance.logout();
      });

      it('should be a function', function () {
        expect(typeof componentInstance.logout).toBe('function');
      });

      it('should opem the confirm dialog',function () {
        expect(componentInstance.$refs.toolbarConfirm.open).toHaveBeenCalled();
      });
    });

    describe('#confirmLogout', function () {
      it('should be a function', function () {
        expect(typeof componentInstance.confirmLogout).toBe('function');
      });

      describe('when type is ok', function () {
        describe('and the request is successful', function () {
          beforeEach(function (done) {
            spyOn(http, 'setLocation');
            spyOn(authService, 'logout').and.callFake(function () {
              return q.resolve({ redirect: '/foo' });
            });

            componentInstance.confirmLogout('ok').done(function () { done(); });
          });

          it('should set the current location based on the passed in redirect', function () {
            expect(http.setLocation).toHaveBeenCalledWith('/foo');
          });
        });

        describe('and the request is not successful', function () {
          beforeEach(function (done) {
            spyOn(authService, 'logout').and.callFake(function () {
              return q.reject('foo');
            });

            componentInstance.confirmLogout('ok').done(function () { done(); });
          });

          it('should set the alert content to the current error', function () {
            expect(componentInstance.alert.content).toEqual('foo');
          });

          it('should open the toolbarDialog', function () {
            expect(componentInstance.$refs.toolbarDialog.open).toHaveBeenCalled();
          });
        });
      });

      describe('when type is not ok', function () {
        beforeEach(function (done) {
          componentInstance.confirmLogout('foo').done(function () { done(); });
        });

        it('should toggle the right side nav',function () {
          expect(componentInstance.$refs.rightSideNav.toggle).toHaveBeenCalled();
        });
      });
    });
  });

});
