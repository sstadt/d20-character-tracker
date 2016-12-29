/**
 * Class FieldSet
 *
 * Used to store values and validation information for a
 * set of form fields.
 *
 * @param rules object The ruleset to initialize fields and check validation from
 *
 * var testRules = {
 *   email: {
 *     required: true,
 *     pattern: 'email' // or regular expression for custom validation
 *   },
 *   password: {
 *     required: true,
 *     minlength: 5
 *   }
 * };
 *
 * Using the constructor with the above rules will return an object
 * with two attributes:
 *
 * rules: a copy of the passed in rules object
 * fields: the same set of attributes at the root of rules, with
 *         associated value and error data for use in component
 *         ViewModels
 *
 * The above ruleset will generate the following fields object:
 *
 * {
 *   email: {
 *     value: '',
 *     errors: [],
 *     hasErrors: false
 *   },
 *   password: {
 *     value: '',
 *     errors: [],
 *     hasErrors: false
 *   }
 * }
 *
 * When adding a FieldSet to a component, call FieldSet.init() to
 * initialize watchers that will keep validation synced with your
 * component data.
 *
 * Doing this will update the errors array and hasErrors field for
 * each field automatically when the value parameter is changes.
 *
 * This makes it easy to bind the value to an input via
 * `FieldSet.fields.email.value`, track error state with
 * `FieldSet.fields.email.hasErrors`, and to display one or all
 * errors via `FieldsSet.fields.email.errors`.
 *
 */


var validation = {
  email: {
    regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Please enter a valid email address'
  },
  url: {
    regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    message: 'Please enter a valid URL'
  },
  number: {
    regex: /[-.0-9]+/,
    message: 'Please enter a valid number'
  }
};

function setWatcher(vm, form, rule) {
  vm.$watch(`${form}.fields.${rule}.value`, _.debounce(function () {
    vm[form].validate(rule);
  }, 300));
}

function FieldSet(rules) {
  var self = this;

  self.rules = rules;
  self.fields = {};

  for (var rule in rules) {
    self.fields[rule] = {
      value: self.rules[rule].default || '',
      errors: [],
      hasErrors: false
    };
  }

  return self;
}

FieldSet.prototype.init = function (vm, form) {
  // console.log(`initializing form ${form}`);
  for (var rule in this.rules) {
    if (this.rules.hasOwnProperty(rule)) {
      // console.log(`setting up watcher for ${rule}`);
      setWatcher(vm, form, rule);
    }
  }
};


FieldSet.prototype.validate = function (rule) {
  var errors = [],
    value = this.fields[rule].value,
    pattern,
    regex,
    message,
    maxlength,
    minlength,
    matchField;

  // console.log(`validating ${rule}`);

  // required validation
  if (this.rules[rule].required === true) {
    if (value === '') {
      errors.push('This field is required');
    }
  }

  // regex validation
  if (this.rules[rule].pattern) {
    pattern = this.rules[rule].pattern;
    regex = (validation[pattern]) ? validation[pattern].regex : pattern;
    message = (validation[pattern]) ? validation[pattern].message : 'Please enter a valid value';

    if (!regex.test(value)) {
      errors.push(message);
    }
  }

  // maxlength validation
  if (this.rules[rule].maxlength && _.isInteger(this.rules[rule].maxlength)) {
    maxlength = this.rules[rule].maxlength;

    if (value.length > maxlength){
      errors.push(`Cannot be longer than ${maxlength} characters`);
    }
  }

  // minlength validation
  if (this.rules[rule].minlength && _.isInteger(this.rules[rule].minlength)) {
    minlength = this.rules[rule].minlength;

    if (value.length < minlength){
      errors.push(`Must be at least ${minlength} characters`);
    }
  }

  // matches validation
  if (this.rules[rule].matches) {
    matchField = this.rules[rule].matches;

    if (value !== this.fields[matchField].value) {
      errors.push(this.rules[rule].mismatchError);
    }
  }

  this.fields[rule].errors = errors;
  this.fields[rule].hasErrors = this.fields[rule].errors.length > 0;
};

FieldSet.prototype.isValid = function () {
  var hasErrors = false;

  for (var rule in this.rules) {
    if (this.rules.hasOwnProperty(rule)) {
      this.validate(rule);
      if (this.fields[rule].hasErrors) {
        hasErrors = true;
      }
    }
  }

  return !hasErrors;
};

FieldSet.prototype.clearErrors = function () {
  for (var rule in this.rules) {
    if (this.fields.hasOwnProperty(rule)) {
      this.fields[rule].errors = [];
      this.fields[rule].hasErrors = false;
    }
  }
};

// probably won't work
FieldSet.prototype.addError = function (rule, error) {
  this.fields[rule].errors.push(error);
  this.fields[rule].hasErrors = true;
};

module.exports = FieldSet;
