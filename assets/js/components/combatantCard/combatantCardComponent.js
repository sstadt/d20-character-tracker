
module.exports = {
  template: require('./combatantCardTemplate.html'),
  props: {
    combatant: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      show: true
    };
  },
  computed: {
    combatantAvatar() {
      return `url(${this.combatant.template.imageUrl})`;
    },
    generalSkills() {
      return _.filter(this.combatant.template.skills, function (skill) {
        return skill.combat === false;
      });
    },
    combatSkills() {
      return _.filter(this.combatant.template.skills, function (skill) {
        return skill.combat === true;
      });
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
