
var constants = require('../../../config/constants.js');
var gameService = require('../../../services/gameService.js');

module.exports = {
  template: require('./playersMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data: function () {
    return {
      gamePlayersAlert: {},
      searching: false,
      filteredPlayers: []
    };
  },
  partials: {
    'player-details': require('./partials/playerDetails.html')
  },
  computed: {
    filterIcon: function () {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    invitePlayer: function (player) {
      console.log('invite player method', player.chatHandle);
    },
    uninvitePlayer: function (player) {
      console.log('uninvite player method', player.chatHandle);
    },
    approvePlayer: function (player) {
      var self = this;

      gameService.approvePlayer(self.game, player)
        .then(function success() {
          self.gamePlayersAlert.close();
        }, function error(reason) {
          self.gamePlayersAlert.error(reason);
        });
    },
    declinePlayer: function (player) {
      var self = this;

      gameService.declinePlayer(self.game, player)
        .then(function () {
          self.gamePlayersAlert.close();
        }, function error(reason) {
          self.gamePlayersAlert.error(reason);
        });
    },
    removePlayer: function (player) {
      var self = this;

      gameService.removePlayer(self.game, player)
        .then(function success() {
          self.gamePlayersAlert.close();
        }, function error(reason) {
          self.gamePlayersAlert.error(reason);
        });
    }
  }
};
