
var constants = require('../../config/constants.js');
var gameService = require('../../services/gameService.js');
var userService = require('../../services/userService.js');

var userSocketHandler = {
  playerJoinApproved: _.debounce(function (approvedGame) {
    var filteredGamesIndex = _.findIndex(this.filteredGames, function (game) {
      return game.id === approvedGame.id;
    });

    this.myGames.push(approvedGame);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].requestingPlayers.$remove(this.user);
      this.filteredGames[filteredGamesIndex].players.push(this.user);
    }
  }, 200)
};

function userSocketMessageIsValid(message) {
  return !!(message.data.game && message.data.game.id);
}

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  data: function () {
    return {
      user: {},
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

    io.socket.on('user', function (message) {
      if (userSocketMessageIsValid(message) && self.user.id && userSocketHandler.hasOwnProperty(message.data.type)) {
        userSocketHandler[message.data.type].call(self, message.data.game, self.user);
      }
    });

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

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
