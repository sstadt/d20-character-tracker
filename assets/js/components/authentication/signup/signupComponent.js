
var authService = require('../../../services/authService.js');
var FieldSet = require('../../../classes/FieldSet.js');

var signupValidation = {
  email: {
    required: true,
    pattern: 'email'
  },
  handle: {
    required: true
  },
  password: {
    required: true,
    minlength: 5
  },
  confirmation: {
    required: true,
    matches: 'password',
    mismatchError: 'Must match password'
  }
};

module.exports = {
  template: require('./signupTemplate.html'),
  data: function () {
    return {
      signupForm: new FieldSet(signupValidation),
      success: false
    };
  },
  created() {
    var vm = this;
    vm.signupForm.init(vm, 'signupForm');
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    },
    signup() {
      var self = this,
        deferred = q.defer(),
        args = {
          email: self.signupForm.fields.email.value,
          password: self.signupForm.fields.password.value,
          confirmation: self.signupForm.fields.confirmation.value,
          handle: self.signupForm.fields.handle.value
        };

      if (self.signupForm.isValid()) {
        authService.signup(args)
          .then(function success(data) {
            self.$refs.alert.success('Success! Check your email to activate your account.');
            self.success = true;
          }, function error(reason) {
            self.$refs.alert.alert(reason);
          })
          .done(function () {
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
