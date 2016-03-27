
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
      console.log('approve player method', player.chatHandle);
    },
    declinePlayer: function (player) {
      console.log('decline player method', player.chatHandle);
    },
    removePlayer: function (player) {
      console.log('remove player method', player.chatHandle);
    }
  }
};
