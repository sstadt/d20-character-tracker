/*
  TODO: Disable rolls that have been assigned
 */

define([
  'vue',
  'util/diceRoller',
  'text!./rollMethodBasicTemplate.html'
], function (Vue, diceRoller, rollMethodBasicTemplate) {

  return {
    template: rollMethodBasicTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    data: function () {
      return {
        activeRoll: undefined,
        rolls: {
          roll1: { selected: false, used: false, value: 0 },
          roll2: { selected: false, used: false, value: 0 },
          roll3: { selected: false, used: false, value: 0 },
          roll4: { selected: false, used: false, value: 0 },
          roll5: { selected: false, used: false, value: 0 },
          roll6: { selected: false, used: false, value: 0 }
        }
      };
    },
    methods: {
      rollStats: function () {
        this.character.clearStats();

        for (var roll in this.rolls) {
          this.rolls[roll].selected = false;
          this.rolls[roll].used = false;
          this.rolls[roll].value = diceRoller.rollSimple(3, 6);
        }
      },
      assignRoll: function (rollKey) {
        if (!this.rolls[rollKey].used) {
          this.rolls[rollKey].selected = true;
          this.activeRoll = rollKey;
        }
      },
      setStatistic: function (statistic) {
        this.rolls[this.activeRoll].selected = false;
        this.rolls[this.activeRoll].used = true;
        this.character[statistic] = this.rolls[this.activeRoll].value;
        this.activeRoll = undefined;
      }
    }
  };

});