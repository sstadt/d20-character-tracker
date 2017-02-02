
var loginComponent = require('./loginComponent.js');
var authService = require('../../../services/authService.js');
var http = require('../../../lib/util.http.js');

Vue.config.silent = true;

describe('The login component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(loginComponent);
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

      componentInstance.$refs = {
        alert: {
          success: jasmine.createSpy('alert.success'),
          alert: jasmine.createSpy('alert.error')
        }
      };
    });

    describe('#setView', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.setView('foo');
      });

      it('should emit a set-view event', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('set-view', 'foo');
      });
    });

    describe('#verify', function () {
      beforeEach(function () {
        spyOn(http, 'getUrlParameter').and.returnValue('foo');
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'verify').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.verify().done(function () { done(); });
        });

        it('should add a success message to the alert', function () {
          expect(componentInstance.$refs.alert.success).toHaveBeenCalledWith(jasmine.any(String));
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'verify').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.verify().done(function () { done(); });
        });

        it('should add an error message to the alert', function () {
          expect(componentInstance.$refs.alert.alert).toHaveBeenCalledWith('foo');
        });
      });
    });

    describe('#resendVerification', function () {
      describe('with a valid email set', function () {
        beforeEach(function () {
          spyOn(componentInstance.loginForm, 'clearErrors');
          componentInstance.loginForm.fields.email.value = 'bob@bob.com';
        });

        describe('on success', function () {
          beforeEach(function (done) {
            spyOn(componentInstance.authService, 'resendValidation').and.callFake(function () {
              return q.resolve();
            });

            componentInstance.resendVerification().done(function () { done(); });
          });

          it('should set a success message', function () {
            expect(componentInstance.$refs.alert.success).toHaveBeenCalledWith(jasmine.any(String));
          });

          it('should set showResend to false', function () {
            expect(componentInstance.showResend).toEqual(false);
          });
        });

        describe('on error', function () {
          beforeEach(function (done) {
            spyOn(componentInstance.authService, 'resendValidation').and.callFake(function () {
              return q.reject({ err: 'foo'});
            });

            componentInstance.resendVerification().done(function () { done(); });
          });

          it('should add an email error message', function () {
            expect(componentInstance.loginForm.fields.email.errors).toEqual(['foo']);
          });

          it('should set showResend to true', function () {
            expect(componentInstance.showResend).toEqual(true);
          });
        });
      });

      describe('without a valid email set', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.loginForm, 'clearErrors');
          spyOn(componentInstance.loginForm, 'addError');
          componentInstance.loginForm.fields.email.value = '';
          componentInstance.resendVerification().done(function () { done(); });
        });

        it('should clear the current errors', function () {
          expect(componentInstance.loginForm.clearErrors).toHaveBeenCalled();
        });

        it('should set showResend to true', function () {
          expect(componentInstance.showResend).toEqual(true);
        });

        it('should set an email error', function () {
          expect(componentInstance.loginForm.addError).toHaveBeenCalledWith('email', jasmine.any(String));
        });
      });
    });

    describe('#login', function () {
      beforeEach(function () {
        spyOn(componentInstance.loginForm, 'isValid').and.returnValue(true);
        componentInstance.loginForm.fields.email.value = 'bob@bob.com';
        componentInstance.loginForm.fields.password.value = '12345';
      });

      it('should be a function', function () {
        expect(typeof componentInstance.login).toBe('function');
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(http, 'setLocation');
          spyOn(componentInstance.authService, 'login').and.callFake(function () {
            return q.resolve({ redirect: '/foo' });
          });

          componentInstance.login().done(function () { done(); });
        });

        it('should reset the password field', function () {
          expect(componentInstance.loginForm.fields.password.value).toEqual('');
        });

        it('should call the setLocation method of the http util with the provided redirect', function () {
          expect(http.setLocation).toHaveBeenCalledWith('/foo');
        });
      });

      describe('on password error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'login').and.callFake(function () {
            return q.reject({ err: 'Password error' });
          });

          componentInstance.login().done(function () { done(); });
        });

        it('should add the error to the password field', function () {
          expect(componentInstance.loginForm.fields.password.errors).toEqual(['Password error']);
        });
      });

      describe('on non-password error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'login').and.callFake(function () {
            return q.reject({ err: 'Other error' });
          });

          componentInstance.login().done(function () { done(); });
        });

        it('should add the error to the email field', function () {
          expect(componentInstance.loginForm.fields.email.errors).toEqual(['Other error']);
        });
      });

      describe('on not yet validated account', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'login').and.callFake(function () {
            return q.reject({ code: 516, err: 'Other error' });
          });

          componentInstance.login().done(function () { done(); });
        });

        it('should set showResend to true', function () {
          expect(componentInstance.showResend).toEqual(true);
        });
      });
    });
  });

});
