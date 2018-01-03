
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
    },
    canEdit: {
      type: Boolean,
      default: true // default this to false
    }
  },
  data() {
    return {
      show: false,
      characterService: null,
      saving: false,
      currentView: 'main',
      rangeBands: config.rangeBands,
      currentTalent: {},
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
    },
    quickSkills() {
      let commonSkills = [
        'Cool', 'Vigilance', 'Perception'
      ];

      if (Boolean(!this.character)) {
        return [];
      }

      return _.filter(this.character.skills, function (skill) {
        return skill.rank > 0 || commonSkills.indexOf(skill.name) > -1;
      });
    },
    equippedWeapons() {
      if (Boolean(!this.character)) {
        return [];
      }

      return _.filter(this.character.equipment, function (item) {
        return item.type === 'weapon' && item.equipped;
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
      if (this.canEdit) this.startSync();
      this.show = true;
    },
    close() {
      if (this.canEdit) this.stopSync();
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
    addTalent() {
      this.currentTalent = new Talent();
      this.openDialog('talent');
    },
    editTalent(talent) {
      this.currentTalent = _.clone(talent);
      this.openDialog('talent');
    },
    saveTalent() {
      var talentIndex = util.getIndexById(this.character.talents, this.currentTalent.id),
        newTalent = _.clone(this.currentTalent);

      if (talentIndex > -1) {
        this.character.talents.splice(talentIndex, 1, newTalent);
      } else {
        this.character.talents.push(newTalent);
      }

      this.closeDialog('talent');
    },
    deleteTalent(talentId) {
      var talentIndex = util.getIndexById(this.character.talents, talentId);

      if (talentIndex > -1) {
        this.character.talents.splice(talentIndex, 1);
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
