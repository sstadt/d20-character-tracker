
var authService = require('../../services/authService.js');

module.exports = {
  template: require('./toolbarTemplate.html'),
  data() {
    return {
      alert: {
        content: 'Error'
      },
      confirm: {
        content: 'Are you sure you want to log out?'
      }
    };
  },
  methods: {
    toggleRightSidenav() {
      this.$refs.rightSidenav.toggle();
    },
    logout() {
      this.$refs.toolbarConfirm.open();
    },
    confirmLogout(type) {
      var self = this,
        deferred = q.defer();

      if (type === 'ok') {
        authService.logout()
          .then(function success(data) {
            window.location.href = data.redirect;
          }, function error(reason) {
            self.alert.content = `Error: ${reason}`;
            self.$refs.toolbarDialog.open();
          })
          .done(function () {
            deferred.resolve();
          });
      } else {
        this.$refs.rightSidenav.toggle();
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
