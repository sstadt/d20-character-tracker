
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

    if (!validation[pattern].regex.test(value)) {
      errors.push(validation[pattern].message);
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

// probably won't work
FieldSet.prototype.addError = function (rule, error) {
  this.fields[rule].errors.push(error);
  this.fields[rule].hasErrors = true;
};

module.exports = FieldSet;
