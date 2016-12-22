
var authService = require('../../../services/authService.js');

module.exports = {
  template: require('./loginTemplate.html'),
  data: function () {
    return {
      email: '',
      emailError: '',
      password: '',
      passwordError: ''
    };
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    },
    login() {
      var self = this,
        deferred = q.defer();

      if (self.email.length > 0 && self.password.length > 0) {
        authService.login(self.email, self.password)
          .then(function success(data) {
            self.password = '';
            window.location.href = data.redirect;
          }, function error(reason) {
            if (reason.indexOf('email') > -1 || reason.indexOf('Email') > -1) {
              self.emailError = reason;
            } else {
              self.passwordError = reason;
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
