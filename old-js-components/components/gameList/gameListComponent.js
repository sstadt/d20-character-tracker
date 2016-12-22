
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
  data() {
    return {
      user: {}
    };
  },
  filters: {
    launchGameLink(game) {
      return '/play/' + game.id;
    },
    canLaunchGame(game, user) {
      return this.hasJoined(game, user);
    },
    canJoinGame(game, user) {
      return !this.hasJoined(game, user) && !this.hasRequestedJoin(game, user);
    },
    joinIsPending(game, user) {
      return !this.hasJoined(game, user) && this.hasRequestedJoin(game, user);
    },
    joinedPlayerList(value) {
      var playerNames = _.extend(value).map(function (player) {
        return player.chatHandle;
      });

      return playerNames.join(', ');
    }
  },
  ready() {
    var self = this;

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });
  },
  methods: {
    hasRequestedJoin(game, user) {
      var playerIndex = _.findIndex(game.requestingPlayers, function (player) {
        return player.id === user.id;
      });

      return playerIndex > -1;
    },
    hasJoined(game, user) {
      var playerIndex = _.findIndex(game.players, function (player) {
        return player.id === user.id;
      });

      return game.gameMaster.id === user.id || playerIndex > -1;
    },
    joinGame(game) {
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
