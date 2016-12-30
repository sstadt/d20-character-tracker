
var gameService = require('../../services/gameService.js');
var userService = require('../../services/userService.js');

function getGameIndex(list, id) {
  return _.findIndex(list, function (game) {
    return game.id === id;
  });
}

var userSocketHandler = {
  playerJoinApproved: _.debounce(function (approvedGame) {
    var filteredGamesIndex = getGameIndex(this.filteredGames, approvedGame.id);

    this.myGames.push(approvedGame);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].requestingPlayers.$remove(this.user);
      this.filteredGames[filteredGamesIndex].players.push(this.user);
    }
  }, 200),
  playerJoinDeclined: function (declinedGame) {
    var filteredGamesIndex = getGameIndex(this.filteredGames, declinedGame.id);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].requestingPlayers.$remove(this.user);
    }
  },
  removedFromGame: function (removedGame) {
    var filteredGamesIndex = getGameIndex(this.filteredGames, removedGame.id),
      myGamesIndex = getGameIndex(this.myGames, removedGame.id);

    this.myGames.$remove(removedGame);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].players.$remove(this.user);
    }

    if (myGamesIndex > -1) {
      this.myGames.$remove(this.myGames[myGamesIndex]);
    }
  }
};

function userSocketMessageIsValid(message) {
  return !!(message.data.game && message.data.game.id);
}

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  data() {
    return {
      user: {},
      filter: '',
      searching: false,
      myGames: [],
      filteredGames: [],
      gameBrowserPrompt: {
        value: '',
        error: ''
      }
    };
  },
  created() {
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
        self.$refs.gameBrowserAlert.close();
      }, function error(reason) {
        self.$refs.gameBrowserAlert.error(reason);
      });
  },
  watch: {
    filter: _.debounce(function (val) {
      var self = this;

      if (val.length > 2) {
        self.searching = true;
        gameService.search(val)
          .then(function success(filteredGames) {
            console.log(_.extend(filteredGames));
            self.filteredGames = _.extend(filteredGames);
            self.$refs.gameBrowserAlert.close();
          }, function (reason) {
            console.log(reason);
            self.$refs.gameBrowserAlert.error(reason);
          })
          .done(function () {
            self.searching = false;
          });
      }
    }, 400)
  },
  computed: {
    filterIcon() {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    newGame() {
      this.$refs.gameBrowserPrompt.open();
    },
    addNewGame() {
      var self = this,
        name = self.gameBrowserPrompt.value;

      if (name !== '') {
        gameService.create(name)
          .then(function success(game) {
            self.myGames.push(game);
            self.$refs.gameBrowserPrompt.close();
          }, function (reason) {
            self.gameBrowserPrompt.error = reason;
          });
      } else {
        self.gameBrowserPrompt.error = 'Game name cannot be empty';
      }
    },
    gameListError(error) {
      self.$refs.gameBrowserAlert.error(error);
    }
  }
};
