
var userService = require('../../services/userService.js');

module.exports = {
  template: require('./userProfileTemplate.html'),
  props: {
    userId: {
      type: String,
      defaultsTo: ''
    }
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    var self = this;

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });
  },
  computed: {
    userName() {
      return (this.user.id) ? this.user.chatHandle : '';
    }
  }
};
