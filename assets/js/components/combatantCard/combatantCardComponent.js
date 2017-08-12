
var config = require('../../lib/config.js');

var DicePool = require('../../classes/DicePool.js');

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
    },
    hasCombatant() {
      return Boolean(this.combatant.template);
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false;
    },
    rollSkill(skill) {
      var abilityScore = this.combatant.template[skill.ability] || 0,
        proficiency = Math.min(abilityScore, skill.rank),
        ability = Math.max(abilityScore, skill.rank) - proficiency,
        pool = new DicePool({
          description: `rolls ${skill.name} (${skill.ability})`,
          ability, proficiency
        }),
        event = new CustomEvent(config.events.dicePool, { detail: pool });

      window.dispatchEvent(event);
    }
  }
};
