
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
      user: {},
      currentView: 'profile'
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
  components: {
    profile: require('./profile/profileComponent.js'),
    games: require('./games/gamesComponent.js'),
    characters: require('./characters/charactersComponent.js')
  },
  computed: {
    userName() {
      return (this.user.id) ? this.user.chatHandle : '';
    }
  },
  methods: {
    setView(view) {
      this.currentView = view;
    }
  }
};
