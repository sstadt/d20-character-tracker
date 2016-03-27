
var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

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

    userService.getUserInfo()
      .then(function success(user) {
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
      var self = this;

      gameService.join(game)
        .then(function success() {
          game.requestingPlayers.push(self.user);
        }, function error(reason) {
          self.$dispatch(constants.errors.gameBrowser.error, reason);
        });
    }
  }
};
