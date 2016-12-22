
module.exports = {
  template: require('./authenticationTemplate.html'),
  data: function () {
    return {
      view: 'login'
    };
  },
  computed: {
    currentView() {
      return this.view;
    }
  },
  components: {
    login: require('./login/loginComponent.js'),
    signup: require('./signup/signupComponent.js'),
    passwordReset: require('./passwordReset/passwordResetComponent')
  },
  events: {
    AUTHENTICATION_TAB_CHANGE(view) {
      this.view = view;
    }
  }
};
