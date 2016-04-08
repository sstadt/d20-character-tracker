
var gameService = require('../../../services/gameService.js');
var constants = require('../../../config/constants.js');

module.exports = {
  template: require('./settingsMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data: function () {
    return {
      gameSettingsAlert: {},
      saving: false
    };
  },
  methods: {
    closeModal: function () {
      this.$dispatch(constants.events.game.closeSettings);
    },
    updateConfig: function () {
      var self = this;

      self.saving = true;

      gameService.updateConfig(self.game.id, self.game.config)
        .then(function success() {
          self.gameSettingsAlert.close();
          self.$dispatch(constants.events.game.closeSettings);
        }, function error(reason) {
          self.gameSettingsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
        });
    }
  }
};
