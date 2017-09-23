
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
      saving: false,
      currentView: 'main'
    };
  },
  computed: {
    hasCharacter() {
      return Boolean(this.character.id);
    },
    generalSkills() {
      if (Boolean(!this.character)) {
        return [];
      }

      return _.filter(this.character.skills, function (skill) {
        return !skill.combat && !skill.knowledge;
      });
    },
    knowledgeSkills() {
      if (Boolean(!this.character)) {
        return [];
      }

      return _.filter(this.character.skills, function (skill) {
        return skill.knowledge;
      });
    },
    combatSkills() {
      if (Boolean(!this.character)) {
        return [];
      }

      return _.filter(this.character.skills, function (skill) {
        return skill.combat;
      });
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
    setView(view) {
      this.currentView = view;
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
