
var config = require('../../../lib/config.js');
var util = require('../../../lib/util.js');

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
    hasRequestedJoin() {
      return this.game.requestingPlayers.indexOf(this.user.id) > -1;
    },
    hasJoined() {
      var playerIndex = _.findIndex(this.game.players, (player) => {
        return player.id === this.user.id;
      });

      return this.game.gameMaster.id === this.user.id || playerIndex > -1;
    },
    canJoinGame() {
      return this.user.id && !this.hasJoined && !this.hasRequestedJoin;
    },
    joinIsPending() {
      return !this.hasJoined && this.hasRequestedJoin;
    },
    canLaunchGame() {
      return this.hasJoined;
    },
    joinedPlayerList() {
      var playerNames = _.extend(this.game.players).map(function (player) {
        return player.chatHandle;
      });

      return playerNames.join(', ');
    }
  },
  methods: {
    joinGame() {
      var self = this,
        deferred = q.defer();

      self.gameService.join({ game: self.game.id })
        .fail(function error(reason) {
          // TODO: hook this up to window notifications event, install handler in gameBrowser and userProfile
          self.$emit('error', reason.err);
        })
        .done(function () {
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
