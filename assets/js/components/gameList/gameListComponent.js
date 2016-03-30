
var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

var userSocketHandler = {
  playerJoinApproved: function (game, user) {
    console.log('player join received');
    gmae.requestingPlayers.$remove(user);
    game.players.push(user);
  }
};

function userSocketMessageIsValid(message) {
  return !!(message.data.game && message.data.game.id);
}

module.exports = {
  template: require('./gameListTemplate.html'),
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      user: {}
    };
  },
  filters: {
    launchGameLink: function (game) {
      return '/play/' + game.id;
    },
    canLaunchGame: function (game, user) {
      return this.hasJoined(game, user);
    },
    canJoinGame: function (game, user) {
      return !this.hasJoined(game, user) && !this.hasRequestedJoin(game, user);
    },
    joinIsPending: function (game, user) {
      return !this.hasJoined(game, user) && this.hasRequestedJoin(game, user);
    },
    joinedPlayerList: function (value) {
      var playerNames = _.extend(value).map(function (player) {
        return player.chatHandle;
      });

      return playerNames.join(', ');
    }
  },
  ready: function () {
    var self = this;

    // listen for updates
    io.socket.on('user', function (message) {
      console.log('user socket message recevied');
      console.log(message);
      console.log(userSocketMessageIsValid(message));
      if (userSocketMessageIsValid(message) && self.user.id && userSocketHandler.hasOwnProperty(message.data.type)) {
        var index = _.findIndex(self.games, function (game) {
          return game.id === message.data.game.id;
        });

        if (index > -1) {
          socketHandler[message.data.type](self.games[index], self.user);
        }
      }
    });

    userService.getUserInfo()
      .then(function success(user) {
        // set user
        self.user = user;
      });
  },
  methods: {
    hasRequestedJoin: function (game, user) {
      var playerIndex = _.findIndex(game.requestingPlayers, function (player) {
        return player.id === user.id;
      });

      return playerIndex > -1;
    },
    hasJoined: function (game, user) {
      var playerIndex = _.findIndex(game.players, function (player) {
        return player.id === user.id;
      });

      return game.gameMaster.id === user.id || playerIndex > -1;
    },
    joinGame: function (game) {
      var self = this,
        deferred = q.defer();

      gameService.join(game)
        .then(function success() {
          game.requestingPlayers.push(self.user);
        }, function error(reason) {
          self.$dispatch(constants.events.gameBrowser.error, reason);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
