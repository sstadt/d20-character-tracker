
var http = require('../../lib/util.http.js');
var config = require('../../lib/config.js');

var Service = require('../../classes/Service.js');

var userService = require('../../services/userService.js');

module.exports = {
  template: require('./toolbarTemplate.html'),
  props: {
    title: {
      type: String,
      defaultsTo: ''
    },
    game: {
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
      },
      user: {},
      authService: new Service({ schema: config.endpoints.auth })
    };
  },
  created() {
    var self = this;

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });
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
        self.authService.logout({ game: self.game })
          .then(function success(data) {
            http.setLocation(data.redirect);
          }, function error(reason) {
            self.alert.content = reason.err;
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
