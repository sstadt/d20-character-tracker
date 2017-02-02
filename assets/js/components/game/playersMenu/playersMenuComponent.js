
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');

module.exports = {
  template: require('./playersMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      searching: false,
      filteredPlayers: [],
      gameService: undefined
    };
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game.id
      },
      debug: true
    });
  },
  computed: {
    filterIcon: function () {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    approvePlayer: function (player) {
      var self = this,
        deferred = q.defer();

      self.gameService.approvePlayer({ player: player.id })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(() => deferred.resolve());

      return deferred.promise;
    },
    declinePlayer: function (player) {
      var self = this,
        deferred = q.defer();

      self.gameService.declinePlayer({ player: player.id })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(() => deferred.resolve());

      return deferred.promise;
    },
    removePlayer: function (player) {
      var self = this,
        deferred = q.defer();

      self.gameService.removePlayer({ player: player.id })
        .fail(function (reason) {
          self.$emit('error', reason.err);
        })
        .done(() => deferred.resolve());

      return deferred.promise;
    }
  }
};
