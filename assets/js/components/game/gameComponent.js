
var gameService = require('../../services/gameService.js');
var constants = require('../../config/constants.js');

require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');
require('../starWarsCrawl/starWarsCrawl.js');

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

    gameService.get(this.gameId)
      .then(function (game) {
        self.game = game;
      }, self.gameAlert.error);
  }
};
