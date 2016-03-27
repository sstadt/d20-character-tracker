
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

function hasJoinedGame(game, user) {
  var playerIndex = _.findIndex(game.players, function (player) {
    return player.id === user.id;
  });

  return game.gameMaster.id === user.id || playerIndex > -1;
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
    canLaunchGame: hasJoinedGame,
    canJoinGame: function (game, user) {
      return !hasJoinedGame(game, user);
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
    joinGame: function (game) {
      var self = this;

      gameService.join(game)
        .then(function success() {
          console.log('joined game successfully');
        }, function error(reason) {
          console.log('error from service');
          // dispatch game error and render in parent
        });
    }
  }
};
