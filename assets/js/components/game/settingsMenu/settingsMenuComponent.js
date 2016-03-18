
var gameService = require('../../../services/gameService.js');

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
      this.$parent.show = false;
    },
    updateConfig: function () {
      var self = this;

      self.saving = true;

      gameService.updateConfig(self.game.id, self.game.config)
        .then(function success() {
          self.$parent.show = false;
        }, self.gameSettingsAlert.error)
        .done(function () {
          self.saving = false;
        });
    }
  }
};
