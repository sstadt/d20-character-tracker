
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');

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
  data() {
    return {
      gameService: undefined
    };
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game.id
      }
    });
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

      self.gameService.join({ game: game.id })
        .fail(function error(reason) {
          self.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
