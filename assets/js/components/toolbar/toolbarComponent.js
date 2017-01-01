
var authService = require('../../services/authService.js');
var http = require('../../lib/util.http.js');

module.exports = {
  template: require('./toolbarTemplate.html'),
  props: {
    title: {
      type: String,
      defaultsTo: ''
    }
  },
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
    toggleRightSideNav() {
      this.$refs.rightSideNav.toggle();
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
            http.setLocation(data.redirect);
          }, function error(reason) {
            self.alert.content = reason;
            self.$refs.toolbarDialog.open();
          })
          .done(function () {
            deferred.resolve();
          });
      } else {
        this.$refs.rightSideNav.toggle();
        deferred.resolve();
      }

      return deferred.promise;
    }
  }
};
