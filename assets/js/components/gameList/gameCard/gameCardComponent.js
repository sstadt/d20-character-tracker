
var gameService = require('../../../services/gameService.js');

module.exports = {
  template: require('./gameCardTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    launchGameLink() {
      return '/play/' + this.game.id;
    },
    canLaunchGame() {
      return this.hasJoined();
    },
    canJoinGame() {
      return this.user.id && !this.hasJoined() && !this.hasRequestedJoin();
    },
    joinIsPending() {
      return !this.hasJoined() && this.hasRequestedJoin();
    },
    joinedPlayerList() {
      var playerNames = _.extend(this.game.players).map(function (player) {
        return player.chatHandle;
      });

      return playerNames.join(', ');
    }
  },
  methods: {
    hasRequestedJoin() {
      var self = this;

      var playerIndex = _.findIndex(self.game.requestingPlayers, function (player) {
        return player.id === self.user.id;
      });

      return playerIndex > -1;
    },
    hasJoined() {
      var self = this;

      var playerIndex = _.findIndex(self.game.players, function (player) {
        return player.id === self.user.id;
      });

      return self.game.gameMaster.id === self.user.id || playerIndex > -1;
    },
    joinGame(game) {
      var self = this,
        deferred = q.defer();

      gameService.join(game)
        .then(function success() {
          game.requestingPlayers.push(self.user);
        }, function error(reason) {
          self.$emit('game-list-error', reason);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
