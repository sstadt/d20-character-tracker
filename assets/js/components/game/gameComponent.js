
var gameService = require('../../services/gameService.js');
var constants = require('../../config/constants.js');

require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');
require('../starWarsCrawl/starWarsCrawl.js');

var socketHandler = {
  playerRequestedJoin: function (game, data) {
    game.requestingPlayers.push(data.player);
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
      gameAlert: {},
      game: {},
      crawlModalOpen: false,
      playersModalOpen: false,
      settingsModalOpen: false
    };
  },
  ready: function () {
    var self = this;

    self.subscribe();

    gameService.get(self.gameId)
      .then(function success(game) {
        self.game = game;
      }, function error(reason) {
        self.gameAlert.error(reason);
      });
  },
  methods: {
    subscribe: function () {
      var self = this;

      io.socket.on('game', function (message) {
        if (message.data.type && socketHandler.hasOwnProperty(message.data.type)) {
          socketHandler[message.data.type](self.game, message.data.data);//.bind(self, message.data.data);
        }
      });
    }
  }
};
