
var config = require('../../lib/config.js');
var util = require('../../lib/util.js');

var Service = require('../../classes/Service.js');

var Equipment = require('../../classes/characters/Equipment.js');
var ForcePower = require('../../classes/characters/ForcePower.js');
var Talent = require('../../classes/characters/Talent.js');

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
      currentView: 'main',
      rangeBands: config.rangeBands,
      currentWeapon: {},
      currentArmor: {},
      currentGear: {}
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
    openDialog(name) {
      this.$refs[`${name}Dialog`].open();
    },
    closeDialog(name) {
      this.$refs[`${name}Dialog`].close();
    },
    setView(view) {
      this.currentView = view;
    },
    startSync() {
      if (syncInterval) this.stopSync();

      lastCharacterState = JSON.parse(JSON.stringify(this.character));

      syncInterval = setInterval(() => {
        if (!this.hasCharacter) {
          this.stopSync();
        } else if (!_.isEqual(this.character, lastCharacterState)) {
          lastCharacterState = JSON.parse(JSON.stringify(this.character));
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
    },
    addEquipment(type) {
      this[`current${util.ucFirst(type)}`] = new Equipment({ type });
      this.openDialog(type);
    },
    editEquipment(equipment) {
      this.currentWeapon = _.clone(equipment);
      this.openDialog(equipment.type);
    },
    saveEquipment(equipment) {
      var itemIndex = util.getIndexById(this.character.equipment, equipment.id),
        newWeapon = _.clone(equipment);
      console.log(equipment);
      if (itemIndex > -1) {
        this.character.equipment.splice(itemIndex, 1, newWeapon);
      } else {
        this.character.equipment.push(newWeapon);
      }

      this.closeDialog(equipment.type);
    },
    deleteEquipment(weaponId) {
      var itemIndex = util.getIndexById(this.character.equipment, weaponId);

      if (itemIndex > -1) {
        this.character.equipment.splice(itemIndex, 1);
      }
    }
  }
};
