

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

function setWatcher(vm, rule) {
  vm.$watch(`form.fields.${rule}.value`, _.debounce(function (value) {
    vm.form.validate(vm, rule, value);
  }, 300));
}

FieldSet.prototype.init = function (vm) {
  for (var rule in vm.form.rules) {
    if (vm.form.rules.hasOwnProperty(rule)) {
      console.log(`setting up watcher for ${rule}`);
      setWatcher(vm, rule);
    }
  }
};

FieldSet.prototype.validate = function (vm, rule, value) {
  var errors = [];

  console.log(`validating ${rule}`);

  if (vm.form.rules[rule].required === true && value === '') {
    errors.push('This field is required');
  }

  vm.$set(vm.form.fields[rule], 'errors',  errors);
  vm.$set(vm.form.fields[rule], 'hasErrors', vm.form.fields[rule].errors.length > 0);
};

module.exports = FieldSet;
