
var constants = require('../../config/constants.js');
var gameService = require('../../services/gameService.js');

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  data: function () {
    return {
      filter: '',
      searching: false,
      myGames: [],
      filteredGames: [],
      gameBrowserAlert: {},
      navigationOpen: false,
      confirmLogout: false
    };
  },
  ready: function () {
    var self = this;

    gameService.getMyGames()
      .then(function success(myGames) {
        self.myGames = myGames;
      }, function (reason) {
        self.gameBrowserAlert.error(reason);
      });
  },
  watch: {
    filter: _.debounce(function (val) {
      var self = this;

      if (val.length > 2) {
        self.searching = true;
        gameService.search(val)
          .then(function success(filteredGames) {
            self.filteredGames = filteredGames;
          }, function (reason) {
            self.gameBrowserAlert.error(reason);
          })
          .done(function () {
            self.searching = false;
          });
      }
    }, 400)
  },
  computed: {
    filterIcon: function () {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    openNewGamePrompt: function () {
      this.$broadcast(constants.events.prompt.promptUser, this.newGamePrompt.name);
    },
    newGame: function () {
      var self = this;

      self.$refs.gameBrowserPrompt.ask({
        question: 'New Game',
        yes: function (name) {
          gameService.create(name)
            .then(function success(game) {
              self.myGames.push(game);
            }, function (reason) {
              self.gameBrowserAlert.error(reason);
            });
        }
      });
    }
  }
};
