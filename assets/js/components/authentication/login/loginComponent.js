
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
      verifying: false
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
        self.verifying = true;
        console.log(self);
        // self.$refs.alert.message('Verifying registration...');

        authService.verify(token)
          .then(function success(response) {
            self.$refs.alert.success('Success! You may now log in');
          }, function error(reason) {
            // add resend option here
            self.$refs.alert.alert(reason);
          })
          .done(function () {
            self.verifying = false;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    login() {
      var self = this,
        deferred = q.defer();

      if (self.loginForm.isValid()) {
        authService.login(self.loginForm.fields.email.value, self.loginForm.fields.password.value)
          .then(function success(data) {
            self.loginForm.fields.password.value = '';
            window.location.href = data.redirect;
          }, function error(reason) {
            if (reason.indexOf('email') > -1 || reason.indexOf('Email') > -1) {
              self.loginForm.addError('email', reason);
            } else {
              self.loginForm.addError('password', reason);
            }
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
