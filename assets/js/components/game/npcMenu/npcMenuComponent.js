
var config = require('../../../lib/config.js');
var util = require('../../../lib/util.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');
var Talent = require('../../../classes/characters/Talent.js');
var ForcePower = require('../../../classes/characters/ForcePower.js');
var Equipment = require('../../../classes/characters/Equipment.js');

const DEFAULT_NPC_IMAGE = '/images/avatar_ph.jpg';

var skillList = config.skills.map(function (skill) {
  skill.rank = 0;
  skill.career = false;
  return skill;
});

var npcValidation = {
  id:              { default: '' },
  game:            {},
  name:            { required: true },
  type:            { required: true },
  description:     {},
  imageUrl:        { required: true, pattern: 'imgurl' },
  brawn:           { pattern: 'integer', default: "2" },
  agility:         { pattern: 'integer', default: "2" },
  intellect:       { pattern: 'integer', default: "2" },
  cunning:         { pattern: 'integer', default: "2" },
  willpower:       { pattern: 'integer', default: "2" },
  presence:        { pattern: 'integer', default: "2" },
  soak:            { pattern: 'integer', default: "0" },
  woundThreshold:  { pattern: 'integer', default: "10" },
  strainThreshold: { pattern: 'integer', default: "0" },
  defenseMelee:    { pattern: 'integer', default: "0" },
  defenseRanged:   { pattern: 'integer', default: "0" },
  skills:          { default: skillList },
  talents:         { default: [] },
  powers:          { default: [] },
  equipment:       { default: [] }
};

module.exports = {
  template: require('./npcMenuTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    npcs: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      view: 'list',
      skillList: config.skills,
      rangeBands: config.rangeBands,
      combatSkills: _.filter(config.skills, function (skill) { return skill.combat === true; }),
      npcForm: new FieldSet(npcValidation),
      saving: false,
      gameService: null
    };
  },
  computed: {
    npcFormImage() {
      var newImage = this.npcForm.fields.imageUrl.value;

      return (this.npcForm.fields.imageUrl.hasErrors || newImage === '') ? DEFAULT_NPC_IMAGE : this.npcForm.fields.imageUrl.value;
    },
    npcFormWeapons() {
      return _.filter(this.npcForm.fields.equipment.value, function (equipment) {
        return equipment.type === 'weapon';
      });
    },
    npcFormArmor() {
      return _.filter(this.npcForm.fields.equipment.value, function (equipment) {
        return equipment.type === 'armor';
      });
    },
    npcFormGear() {
      return _.filter(this.npcForm.fields.equipment.value, function (equipment) {
        return equipment.type === 'gear';
      });
    }
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game
      }
    });
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    newNpc() {
      this.npcForm.reset();
      this.setView('form');
    },
    incrementNewNpcSkill(name) {
      var index = _.findIndex(this.npcForm.fields.skills.value, function (skill) {
        return skill.name === name;
      });

      if (index > -1 && this.npcForm.fields.skills.value[index].rank < 5) {
        this.npcForm.fields.skills.value[index].rank++;
      }
    },
    decrementNewNpcSkill(name) {
      var index = _.findIndex(this.npcForm.fields.skills.value, function (skill) {
        return skill.name === name;
      });

      if (index > -1 && this.npcForm.fields.skills.value[index].rank > 0) {
        this.npcForm.fields.skills.value[index].rank--;
      }
    },
    addTalent() {
      this.npcForm.fields.talents.value.push(new Talent());
    },
    removeTalent(talentId) {
      var index = util.getIndexById(this.npcForm.fields.talents.value, talentId);
      this.npcForm.fields.talents.value.splice(index, 1);
    },
    addForcePower() {
      this.npcForm.fields.powers.value.push(new ForcePower());
    },
    removeForcePower(powerId) {
      var index = util.getIndexById(this.npcForm.fields.powers.value, powerId);
      this.npcForm.fields.powers.value.splice(index, 1);
    },
    addForcePowerUpgrade(powerId) {
      var index = util.getIndexById(this.npcForm.fields.powers.value, powerId);
      this.npcForm.fields.powers.value[index].addUpgrade();
    },
    removeForcePowerUpgrade(powerId, upgradeId) {
      var powerIndex = util.getIndexById(this.npcForm.fields.powers.value, powerId),
        upgradeIndex = util.getIndexById(this.npcForm.fields.powers.value[powerIndex].upgrades, upgradeId);

      this.npcForm.fields.powers.value[powerIndex].upgrades.splice(upgradeIndex, 1);
    },
    addEquipment(type) {
      this.npcForm.fields.equipment.value.push(new Equipment({ type }));
    },
    removeEquipment(equipmentId) {
      var index = util.getIndexById(this.npcForm.fields.equipment.value, equipmentId);
      this.npcForm.fields.equipment.value.splice(index, 1);
    },
    submitNpc() {
      if (this.npcForm.fields.id.value !== '') {
        this.saveNpc();
      } else {
        this.addNpc();
      }
    },
    addNpc() {
      var self = this,
        deferred = q.defer(),
        npc;

      if (self.npcForm.isValid()) {
        npc = self.npcForm.export();

        delete npc.id;
        npc.game = self.game;

        self.gameService.createNpc({ npc })
          .then(function success() {
            self.setView('list');
            self.npcForm.reset();
          }, function error(reason) {
            self.$emit('error', reason.err);
          })
          .done(function () {
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    saveNpc() {
      console.log('save NPC');
    }
  }
};