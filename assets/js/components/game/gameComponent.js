
var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');
require('../starWarsCrawl/starWarsCrawl.js');

var socketHandler = {
  playerRequestedJoin: function (game, data) {
    game.requestingPlayers.push(data.player);
  },
  playerJoinApproved: function (game, data) {
    var playerIndex = _.findIndex(game.requestingPlayers, function (player) {
      return player.id === data.player.id;
    });

    if (playerIndex > -1) {
      game.requestingPlayers.$remove(game.requestingPlayers[playerIndex]);
    }

    game.players.push(data.player);
  }
};

var events = {};

events[constants.events.game.closeCrawl] = function CloseCrawlModal() {
  this.crawlModalOpen = false;
};

events[constants.events.game.closePlayers] = function CloseCrawlModal() {
  this.playersModalOpen = false;
};

events[constants.events.game.closeSettings] = function CloseCrawlModal() {
  this.settingsModalOpen = false;
};

function socketMessageIsValid(message) {
  return message.data.game && message.data.type && message.data.data;
}

module.exports = {
  template: require('./gameTemplate.html'),
  events: events,
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
      settingsModalOpen: false
    };
  },
  ready: function () {
    var self = this;

    io.socket.on('game', function (message) {
      if (socketMessageIsValid(message) && self.game.id === message.data.game && socketHandler.hasOwnProperty(message.data.type)) {
        socketHandler[message.data.type](self.game, message.data.data);
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
  }
};
