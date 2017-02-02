
var signupComponent = require('./signupComponent.js');

Vue.config.silent = true;

describe('The signup component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(signupComponent);
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

    describe('#signup', function () {
      beforeEach(function () {
        spyOn(componentInstance.signupForm, 'isValid').and.returnValue(true);
        componentInstance.signupForm.fields.email.value = 'bob@bob.com';
        componentInstance.signupForm.fields.password.value = '12345';
        componentInstance.signupForm.fields.confirmation.value = '12345';
      });

      it('should be a function', function () {
        expect(typeof componentInstance.signup).toBe('function');
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'signup').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.signup().done(function () { done(); });
        });

        it('should reset the password fields', function () {
          expect(componentInstance.signupForm.fields.password.value).toEqual('');
          expect(componentInstance.signupForm.fields.confirmation.value).toEqual('');
        });

        it('should show a success message', function () {
          expect(componentInstance.$refs.alert.success).toHaveBeenCalledWith(jasmine.any(String));
        });

        it('should set success to true', function () {
          expect(componentInstance.success).toEqual(true);
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.authService, 'signup').and.callFake(function () {
            return q.reject({ err: 'Password error' });
          });

          componentInstance.signup().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.$refs.alert.alert).toHaveBeenCalledWith('Password error');
        });
      });
    });
  });

});
