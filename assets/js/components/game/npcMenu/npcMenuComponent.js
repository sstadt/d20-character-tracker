
var config = require('../../../lib/config.js');

var Service = require('../../../classes/Service.js');
var FieldSet = require('../../../classes/FieldSet.js');

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
  abilities:       { default: [] },
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
    },
  },
  components: {
    skillEditor: require('./skillEditor/skillEditorComponent.js')
  },
  methods: {
    setView(view) {
      this.view = view;
    },
    incrementSkill(skills, name) {
      var index = _.findIndex(skills, function (skill) {
        return skill.name === name;
      });

      if (skills[index].rank < 5) skills[index].rank++;
    },
    decrementSkill(skills, name) {
      var index = _.findIndex(skills, function (skill) {
        return skill.name === name;
      });

      if (skills[index].rank > 0) skills[index].rank--;
    }
  }
};
