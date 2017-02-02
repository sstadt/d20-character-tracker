
var userService = require('../../services/userService.js');

module.exports = {
  template: require('./gameListTemplate.html'),
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      user: {}
    };
  },
  created() {
    var self = this;

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });
  }
};
