
var FieldSet = require('./FieldSet.js');


var testRules = {
  email: {
    pattern: 'email'
  },
  username: {
    required: true,
    maxlength: 8
  },
  password: {
    required: true,
    minlength: 5
  },
  confirm: {
    matches: 'password'
  },
  // custom: {
  //   pattern: '/[0-9]*/'
  // },
  cakeorpie: {
    default: 'pie'
  }
};

describe('The FieldSet class', function () {
  var form;

  beforeEach(function () {
    form = new FieldSet(testRules);
  });

  it('to be an object', function () {
    expect(form).toEqual(jasmine.any(Object));
  });

  describe('constructor', function () {
    it('should return an object', function () {
      expect(form).toEqual(jasmine.any(Object));
    });

    it('should include a fields parameter that is an object', function () {
      expect(form.fields).toEqual(jasmine.any(Object));
    });

    it('should include a rules parameter that is an object', function () {
      expect(form.rules).toEqual(jasmine.any(Object));
    });

    describe('fields', function () {
      var fields;

      beforeEach(function () {
        fields = form.fields;
      });

      it('should have a string value entry for each provided rule', function () {
        for (var rule in testRules) {
          expect(fields[rule].value).toEqual(jasmine.any(String));
          expect(fields[rule].hasOwnProperty('value')).toEqual(true);
        }
      });

      it('should have an array errors entry for each provided rule', function () {
        for (var rule in testRules) {
          expect(fields[rule].errors).toEqual(jasmine.any(Array));
          expect(fields[rule].hasOwnProperty('errors')).toEqual(true);
        }
      });

      it('should have an bool hasErrors entry for each provided rule', function () {
        for (var rule in testRules) {
          expect(fields[rule].hasErrors).toEqual(jasmine.any(Boolean));
          expect(fields[rule].hasOwnProperty('hasErrors')).toEqual(true);
        }
      });
    });

    describe('rules', function () {
      var rules;

      beforeEach(function () {
        rules = form.rules;
      });

      it('should be a copy of the passed in rules', function () {
        expect(_.isEqual(rules, testRules)).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var formCopy;

    beforeEach(function () {
      formCopy = form;
    });

    describe('#init', function () {
      it('should be a function', function () {
        expect(typeof formCopy.init).toBe('function');
      });
    });

    describe('#validate', function () {
      it('should not have an error when checking a required fields with a value',function () {
        formCopy.fields.username.value = 'bob';
        formCopy.validate('username');
        expect(formCopy.fields.username.hasErrors).toEqual(false);
      });

      it('should have an error when checking a required fields with no value',function () {
        formCopy.validate('username');
        expect(formCopy.fields.username.hasErrors).toEqual(true);
      });

      it('should not have an error when checking an valid pattern', function () {
        formCopy.fields.email.value = 'bob@bob.com';
        formCopy.validate('email');
        expect(formCopy.fields.email.hasErrors).toEqual(false);
      });

      it('should have an error when checking an invalid pattern', function () {
        formCopy.fields.email.value = 'foo';
        formCopy.validate('email');
        expect(formCopy.fields.email.hasErrors).toEqual(true);
      });

      it('should not have an error when checking a valid maxlength', function () {
        formCopy.fields.username.value = '123456';
        formCopy.validate('username');
        expect(formCopy.fields.username.hasErrors).toEqual(false);
      });

      it('should have an error when checking an invalid maxlength', function () {
        formCopy.fields.username.value = '123456789';
        formCopy.validate('username');
        expect(formCopy.fields.username.hasErrors).toEqual(true);
      });

      it('should not have an error when checking a valid minlength', function () {
        formCopy.fields.password.value = '12345';
        formCopy.validate('password');
        expect(formCopy.fields.password.hasErrors).toEqual(false);
      });

      it('should have an error when checking an invalid minlength', function () {
        formCopy.fields.password.value = '1234';
        formCopy.validate('password');
        expect(formCopy.fields.password.hasErrors).toEqual(true);
      });
    });

    describe('#isValid', function () {
      beforeEach(function () {
        spyOn(formCopy, 'validate').and.callThrough();
      });

      it('should validate each field', function () {
        formCopy.isValid();

        for (var rule in testRules) {
          expect(formCopy.validate).toHaveBeenCalledWith(rule);
        }
      });

      it('should return true if all fields are valid', function () {
        formCopy.fields.email.value = 'bob@bob.com';
        formCopy.fields.username.value = 'bob';
        formCopy.fields.password.value = '12345';
        formCopy.fields.confirm.value = '12345';

        expect(formCopy.isValid()).toEqual(true);
      });

      it('should return false if there are any errors', function () {
        expect(formCopy.isValid()).toEqual(false);
      });
    });

    describe('#clearError', function () {
      beforeEach(function () {
        formCopy.addError('email', 'foo');
        formCopy.addError('username', 'bar');
        formCopy.addError('password', 'baz');
        formCopy.clearErrors();
      });

      it('should clear all errors', function () {
        for (var field in formCopy.fields) {
          expect(formCopy.fields[field].errors).toEqual([]);
          expect(formCopy.fields[field].hasErrors).toEqual(false);
        }
      });
    });

    describe('#addError', function () {
      beforeEach(function () {
        formCopy.addError('email', 'foo');
      });

      it('should add an error to the appropriate field', function () {
        expect(formCopy.fields.email.errors).toEqual(['foo']);
      });

      it('should ser the hasErrors property for the appropriate field to true', function () {
        expect(formCopy.fields.email.hasErrors).toEqual(true);
      });
    });
  });

});
