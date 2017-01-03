
var gameService = require('../../services/gameService.js');
var userService = require('../../services/userService.js');

function getIndex(list, id) {
  return _.findIndex(list, function (item) {
    return item.id === id;
  });
}

var userSocketHandler = {
  playerJoinApproved: _.debounce(function (approvedGame) {
    var filteredGamesIndex = getIndex(this.filteredGames, approvedGame.id),
      userIndex = getIndex(this.filteredGames[filteredGamesIndex].requestingPlayers, this.user.id);

    this.myGames.push(approvedGame);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].requestingPlayers.splice(userIndex, 1);
      this.filteredGames[filteredGamesIndex].players.push(this.user);
    }
  }, 200),
  playerJoinDeclined: function (declinedGame) {
    var filteredGamesIndex = getIndex(this.filteredGames, declinedGame.id),
      userIndex = getIndex(this.filteredGames[filteredGamesIndex].requestingPlayers, this.user.id);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].requestingPlayers.splice(userIndex, 1);
    }
  },
  removedFromGame: function (removedGame) {
    var filteredGamesIndex = getIndex(this.filteredGames, removedGame.id),
      myGamesIndex = getIndex(this.myGames, removedGame.id),
      userIndex = getIndex(this.filteredGames[filteredGamesIndex].players, this.user.id);

    this.myGames.$remove(removedGame);

    if (filteredGamesIndex > -1) {
      this.filteredGames[filteredGamesIndex].players.splice(userIndex, 1);
    }

    if (myGamesIndex > -1) {
      this.myGames.splice(myGamesIndex, 1);
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
            self.filteredGames = _.extend(filteredGames);
            self.$refs.gameBrowserAlert.close();
          }, function (reason) {
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
