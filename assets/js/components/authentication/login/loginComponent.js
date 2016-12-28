
var authService = require('../../../services/authService.js');
var FieldSet = require('../../../classes/FieldSet.js');
var http = require('../../../lib/util.http.js');

var loginValidation = {
  email: {
    required: true,
    pattern: 'email'
  },
  password: {
    required: true
  }
};

module.exports = {
  template: require('./loginTemplate.html'),
  data: function () {
    return {
      loginForm: new FieldSet(loginValidation),
      loading: false,
      showResend: false
    };
  },
  created() {
    this.loginForm.init(this, 'loginForm');
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    },
    verify() {
      var self = this,
        token = http.getUrlParameter('verify'),
        deferred = q.defer();

      // check verification token
      if (token) {
        self.loading = true;

        authService.verify(token)
          .then(function success(response, verified) {
            self.$refs.alert.success('Success! You may now log in');
          }, function error(reason) {
            self.$refs.alert.alert(reason);
          })
          .done(function () {
            self.loading = false;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    resendVerification() {
      var self = this,
        email = self.loginForm.fields.email.value,
        deferred = q.defer();

      self.loginForm.clearErrors();

      if (email !== '' && self.loginForm.fields.email.hasErrors === false) {
        self.loading = true;
        authService.resendValidation(email)
          .then(function success() {
            self.$refs.alert.success('Success! Check your email to verify your account.');
          }, function error(reason) {
            self.showResend = true;
            self.loginForm.addError('email', reason);
          })
          .done(function () {
            self.loading = false;
            deferred.resolve();
          });
      } else {
        self.showResend = true;
        self.loginForm.addError('email', 'Please enter a valid email to resend your account validation.');
        deferred.resolve();
      }

      return deferred.promise;
    },
    login() {
      var self = this,
        deferred = q.defer();

      if (self.loginForm.isValid()) {
        self.loading = true;
        authService.login(self.loginForm.fields.email.value, self.loginForm.fields.password.value)
          .then(function success(data) {
            self.loginForm.fields.password.value = '';
            window.location.href = data.redirect;
          }, function error(response) {
            self.showResend = response.showResend;

            if (response.err.indexOf('password') > -1 || response.err.indexOf('Password') > -1) {
              self.loginForm.addError('password', response.err);
            } else {
              self.loginForm.addError('email', response.err);
            }
          })
          .done(function () {
            self.loading = false;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
