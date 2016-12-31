
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
      saving: false
    };
  },
  methods: {
    closeModal: function () {
      this.$emit('close');
    },
    updateConfig: function () {
      var self = this,
        deferred = q.defer();

      self.saving = true;

      gameService.updateConfig(self.game.id, self.game.config)
        .then(function success() {
          self.$refs.gameSettingsAlert.close();
          self.$emit('close');
        }, function error(reason) {
          self.$refs.gameSettingsAlert.error(reason);
        })
        .done(function () {
          self.saving = false;
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
