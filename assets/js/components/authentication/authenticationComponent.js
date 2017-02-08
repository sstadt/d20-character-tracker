
var http = require('../../lib/util.http.js');


module.exports = {
  template: require('./authenticationTemplate.html'),
  data: function () {
    var resetToken = http.getUrlParameter('reset') || '';

    return {
      resetToken,
      view: (resetToken !== '') ? 'passwordReset' : 'login'
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
  methods: {
    setView(view) {
      this.view = view;
    }
  }
};
