
var Vue = require('vue');
var _ = require('lodash');

var userService = require('../../services/userService.js');

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
      return _.isEqual(game.gameMaster, user) || _.includes(game.players, user);
    },
    canJoinGame: function (game, user) {
      return !(_.isEqual(game.gameMaster, user) || _.includes(game.players, user));
    },
    joinedPlayerList: function (value) {
      var playerNames = _.clone(value).map(function (player) {
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
  }
};
