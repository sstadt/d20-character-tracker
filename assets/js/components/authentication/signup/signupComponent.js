
var config = require('../../../lib/config.js');

var FieldSet = require('../../../classes/FieldSet.js');
var Service = require('../../../classes/Service.js');

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
      success: false,
      authService: new Service({ schema: config.endpoints.auth })
    };
  },
  created() {
    var self = this;
    self.signupForm.init(self, 'signupForm');
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    },
    signup() {
      var self = this,
        deferred = q.defer(),
        newUser = {
          email: self.signupForm.fields.email.value,
          password: self.signupForm.fields.password.value,
          confirmation: self.signupForm.fields.confirmation.value,
          handle: self.signupForm.fields.handle.value
        };

      if (self.signupForm.isValid()) {
        self.authService.signup(newUser)
          .then(function success(data) {
            self.signupForm.fields.password.value = '';
            self.signupForm.fields.confirmation.value = '';
            self.$refs.alert.success('Success! Check your email to activate your account.');
            self.success = true;
          }, function error(reason) {
            self.$refs.alert.alert(reason.err);
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
