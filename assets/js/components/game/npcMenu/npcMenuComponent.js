
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');
var Talent = require('../../../classes/characters/Talent.js');

const DEFAULT_NPC_IMAGE = '/images/avatar_ph.jpg';

var skillList = config.skills.map(function (skill) {
  skill.rank = 0;
  skill.career = false;
  return skill;
});

var npcValidation = {
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
    }
  },
  data() {
    return {
      view: 'list',
      skillList: config.skills,
      newNpcForm: new FieldSet(npcValidation),
      saving: false
    };
  },
  computed: {
    newNpcImage() {
      var newImage = this.newNpcForm.fields.imageUrl.value;

      return (this.newNpcForm.fields.imageUrl.hasErrors || newImage === '') ? DEFAULT_NPC_IMAGE : this.newNpcForm.fields.imageUrl.value;
    }
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    incrementNewNpcSkill(name) {
      var index = _.findIndex(this.newNpcForm.fields.skills.value, function (skill) {
        return skill.name === name;
      });

      if (index > -1 && this.newNpcForm.fields.skills.value[index].rank < 5) {
        this.newNpcForm.fields.skills.value[index].rank++;
      }
    },
    decrementNewNpcSkill(name) {
      var index = _.findIndex(this.newNpcForm.fields.skills.value, function (skill) {
        return skill.name === name;
      });

      if (index > -1 && this.newNpcForm.fields.skills.value[index].rank > 0) {
        this.newNpcForm.fields.skills.value[index].rank--;
      }
    },
    addTalent() {
      this.newNpcForm.fields.talents.value.push(new Talent());
    }
  }
};
