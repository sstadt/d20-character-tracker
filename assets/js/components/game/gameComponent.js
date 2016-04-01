
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
  data: function () {
    return {
      user: {},
      gameAlert: {},
      game: {},
      crawlModalOpen: false,
      playersModalOpen: false,
      settingsModalOpen: false,
      navigationOpen: false,
      confirmLogout: false
    };
  },
  ready: function () {
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
      }, function error(reason) {
        self.gameAlert.error(reason);
      });
  },
  computed: {
    userIsGameMaster: function () {
      return this.game.gameMaster && this.game.gameMaster.id === this.user.id;
    }
  },
  partials: {
    'players-pane': require('./partials/playersPane.html'),
    'crawl-pane': require('./partials/crawlPane.html'),
    'chat-pane': require('./partials/chatPane.html')
  },
  events: {
    [constants.events.game.closeCrawl]: function CloseCrawlModal() {
      this.crawlModalOpen = false;
    },
    [constants.events.game.closePlayers]: function CloseCrawlModal() {
      this.playersModalOpen = false;
    },
    [constants.events.game.closeSettings]: function CloseCrawlModal() {
      this.settingsModalOpen = false;
    }
  },
};
