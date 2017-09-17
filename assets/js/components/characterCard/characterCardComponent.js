
var config = require('../../lib/config.js');
var util = require('../../lib/util.js');
var Service = require('../../classes/Service.js');

const SYNC_TIMER = 5000;

var syncInterval, lastCharacterState;

module.exports = {
  template: require('./characterCardTemplate.html'),
  props: {
    character: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      characterService: null,
      saving: false
    };
  },
  computed: {
    hasCharacter() {
      return Boolean(this.character.id);
    }
  },
  created() {
    this.characterService = new Service({
      schema: config.endpoints.character
    });
  },
  methods: {
    open() {
      this.startSync();
      this.show = true;
    },
    close() {
      this.stopSync();
      this.show = false;
    },
    startSync() {
      if (syncInterval) this.stopSync();

      lastCharacterState = _.clone(this.character);

      syncInterval = setInterval(() => {
        if (!this.hasCharacter) {
          this.stopSync();
        } else if (!_.isEqual(this.character, lastCharacterState)) {
          lastCharacterState = _.clone(this.character);
          this.saveCharacter();
        }
      }, SYNC_TIMER);
    },
    stopSync() {
      clearInterval(syncInterval);
      syncInterval = null;
    },
    saveCharacter() {
      var self = this;

      if (!self.saving) {
        self.saving = true;

        self.characterService.updateCharacter({ characterId: self.character.id, character: self.character })
          .fail(function (error) {
            util.sendNotification(error.err, 'alert');
          })
          .done(() => this.saving = false);
      }
    }
  }
};
