
var authService = require('../../../services/authService.js');
var FieldSet = require('../../../classes/FieldSet.js');

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
    };
  },
  created() {
    var self = this;
    self.loginForm.init(self, 'loginForm');
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
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
