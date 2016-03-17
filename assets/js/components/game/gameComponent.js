
var gameService = require('../../services/gameService.js');

require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');

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
