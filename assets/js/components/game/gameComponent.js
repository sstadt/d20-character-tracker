
var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');
require('../starWarsCrawl/starWarsCrawl.js');

function getPlayerIndex(list, id) {
  return _.findIndex(list, function (player) {
    return player.id === id;
  });
}

var playerSocketHandler = {
  playerRequestedJoin: function (game, data) {
    game.requestingPlayers.push(data.player);
  },
  playerJoinApproved: function (game, data) {
    var playerIndex = getPlayerIndex(game.requestingPlayers, data.player.id);

    if (playerIndex > -1) {
      game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
    }

    game.players.push(data.player);
  },
  playerJoinDeclined: function (game, data) {
    var playerIndex = getPlayerIndex(game.requestingPlayers, data.player.id);

    if (playerIndex > -1) {
      game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
    }
  },
  playerRemoved: function (game, data, user) {
    var playerIndex = getPlayerIndex(game.players, data.player.id);

    if (playerIndex > -1) {
      game.players.$remove(game.players[playerIndex]);
    }

    if (data.player.id === user.id) {
      window.location.href = '/home';
    }
  }
};

function playerSocketMessageIsValid(message) {
  return message.data.game && message.data.type && message.data.data;
}

module.exports = {
  template: require('./gameTemplate.html'),
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      user: {},
      gameAlert: {},
      game: {},
      crawlModalOpen: false,
      playersModalOpen: false,
      settingsModalOpen: false,
      navigationOpen: false,
      confirmLogout: false,
      selectedCrawlId: ''
    };
  },
  ready() {
    var self = this;

    io.socket.on('game', function (message) {
      if (playerSocketMessageIsValid(message) && self.game.id === message.data.game && playerSocketHandler.hasOwnProperty(message.data.type)) {
        playerSocketHandler[message.data.type](self.game, message.data.data, self.user);
      }
    });

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

    gameService.get(self.gameId)
      .then(function success(game) {
        self.game = game;
        // TODO: set the active crawl to the most recent one
      }, function error(reason) {
        self.gameAlert.error(reason);
      });
  },
  computed: {
    userIsGameMaster() {
      return this.game.gameMaster && this.game.gameMaster.id === this.user.id;
    },
    crawlOptions() {
      var self = this,
        crawlOptions = [];

      if (self.game && self.game.crawls) {
        _.forEach(self.game.crawls, function (crawl) {
          crawlOptions.push({
            value: crawl.id,
            label: crawl.title
          });
        });
      }

      return crawlOptions;
    },
    selectedCrawl() {
      var self = this,
        index = _.findIndex(self.game.crawls, function (crawl) {
          return crawl.id === self.selectedCrawlId;
        });

      return index > -1 ? self.game.crawls[index] : null;
    }
  },
  partials: {
    'players-pane': require('./partials/playersPane.html'),
    'crawl-pane': require('./partials/crawlPane.html'),
    'chat-pane': require('./partials/chatPane.html')
  },
  events: {
    [constants.events.game.closeCrawl]() {
      this.crawlModalOpen = false;
    },
    [constants.events.game.closePlayers]() {
      this.playersModalOpen = false;
    },
    [constants.events.game.closeSettings]() {
      this.settingsModalOpen = false;
    }
  },
  methods: {
    playCrawl(crawl) {
      // TODO: Add crawl component to game and trigger play
    }
  }
};
