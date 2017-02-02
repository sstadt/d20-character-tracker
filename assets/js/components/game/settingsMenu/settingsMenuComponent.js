
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');

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
      saving: false,
      gameService: undefined
    };
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game.id
      }
    });
  },
  methods: {
    closeModal: function () {
      this.$emit('close');
    },
    updateConfig: function () {
      var self = this,
        deferred = q.defer();

      self.saving = true;

      self.gameService.updateConfig(self.game.id, self.game.config)
        .then(function success() {
          self.$refs.gameSettingsAlert.close();
          self.$emit('close');
        }, function error(reason) {
          self.$refs.gameSettingsAlert.error(reason.err);
        })
        .done(function () {
          self.saving = false;
          deferred.resolve();
        });

      return deferred.promise;
    }
  }
};
