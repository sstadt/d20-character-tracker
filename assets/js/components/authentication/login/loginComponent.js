
var Service = require('../../../classes/Service.js');

var config = require('../../../lib/config.js');

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
      showResend: false,
      authService: new Service({ schema: config.endpoints.auth })
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

        self.authService.verify({ token })
          .then(function success() {
            self.$refs.alert.success('Success! You may now log in');
          }, function error(reason) {
            self.$refs.alert.alert(reason.err);
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
        self.authService.resendValidation({ email })
          .then(function success() {
            self.showResend = false;
            self.$refs.alert.success('Success! Check your email to verify your account.');
          }, function error(reason) {
            self.showResend = true;
            self.loginForm.addError('email', reason.err);
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
        self.authService.login({
          email: self.loginForm.fields.email.value,
          password: self.loginForm.fields.password.value
        })
          .then(function success(data) {
            self.loginForm.fields.password.value = '';
            http.setLocation(data.redirect);
          }, function error(response) {
            self.showResend = (response.code === 516) ? true : false;

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
