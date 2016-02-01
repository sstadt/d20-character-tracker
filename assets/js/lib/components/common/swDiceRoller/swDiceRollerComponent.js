
define([
  'lodash',
  'util/diceRoller',
  'text!./swDiceRollerTemplate.html'
], function (_, diceRoller, swDiceRollerTemplate) {
  var resultTypes = [
      'success',
      'advantage',
      'triumph',
      'failure',
      'threat',
      'despair',
      'light',
      'dark'
    ],
    results = {
      boost: [ // d6
        {},                           // 1
        {},                           // 2
        { success: 1 },               // 3
        { success: 1, advantage: 1 }, // 4
        { advantage: 2 },             // 5
        { advantage: 1 }              // 6
      ],
      ability: [ // d8
        {},                           // 1
        { success: 1 },               // 2
        { success: 1 },               // 3
        { success: 2 },               // 4
        { advantage: 1 },             // 5
        { advantage: 1 },             // 6
        { success: 1, advantage: 1 }, // 7
        { advantage: 2 }              // 8
      ],
      proficiency: [ // d12
        {},                           // 1
        { success: 1 },               // 2
        { success: 1 },               // 3
        { success: 2 },               // 4
        { success: 2 },               // 5
        { advantage: 1 },             // 6
        { success: 1, advantage: 1 }, // 7
        { success: 1, advantage: 1 }, // 8
        { success: 1, advantage: 1 }, // 9
        { advantage: 2 },             // 10
        { advantage: 2 },             // 11
        { triumph: 2 },               // 12
      ],
      setback: [ // d6
        {},             // 1
        {},             // 2
        { failure: 1 }, // 3
        { failure: 1 }, // 4
        { threat: 1 },  // 5
        { threat: 1 }   // 6
      ],
      difficulty: [ // d8
        {},                       // 1
        { failure: 1 },           // 2
        { failure: 2 },           // 3
        { threat: 1 },            // 4
        { threat: 1 },            // 5
        { threat: 1 },            // 6
        { threat: 2 },            // 7
        { failure: 1, threat: 1 } // 8
      ],
      challenge: [ // d12
        {},                        // 1
        { failure: 1 },            // 2
        { failure: 1 },            // 3
        { failure: 2 },            // 4
        { failure: 2 },            // 5
        { threat: 1 },             // 6
        { threat: 1 },             // 7
        { failure: 1, threat: 1 }, // 8
        { failure: 1, threat: 1 }, // 9
        { threat: 2 },             // 10
        { threat: 2 },             // 11
        { despair: 1 }             // 12
      ],
      force: [ // d12
        { dark: 1 },  // 1
        { dark: 1 },  // 2
        { dark: 1 },  // 3
        { dark: 1 },  // 4
        { dark: 1 },  // 5
        { dark: 1 },  // 6
        { dark: 2 },  // 7
        { light: 1 }, // 8
        { light: 1 }, // 9
        { light: 2 }, // 10
        { light: 2 }, // 11
        { light: 2 }, // 12
      ]
    };

  function getRollResult(type) {
    var roll;

    if (results.hasOwnProperty(type)) {
      roll = diceRoller.rollSimple(1, results[type].length);
    }

    return _.isInteger(roll) ? _.clone(results[type][roll-1]) : {};
  }

  function rollDieGroup(type, num)  {
    var rolls = [];

    for (var i = 0; i < num; i++) {
      rolls.push(getRollResult(type));
    }

    return rolls;
  }

  function RollResult(data) {
    var overallResults = {};

    for (var i = 0, j = resultTypes.length; i < j; i++) {
      overallResults[resultTypes[i]] = 0;
    }

    _.each(data, function (rolls, dieType) {
      _.each(rolls, function (rollResult) {
        _.each(rollResult, function (num, resultName) {
          if (_.isInteger(overallResults[resultName])) {
            overallResults[resultName] += num;
          }
        });
      });
    });

    this.overallResults = overallResults;
    this.dieResults = data;
  }

  return {
    template: swDiceRollerTemplate,
    data: function () {
      return {
        open: false,
        description: '',
        rollHistory: [],
        dicePool: {
          ability: 0,
          proficiency: 0,
          difficulty: 0,
          challenge: 0,
          boost: 0,
          setback: 0,
          force: 0
        }
      };
    },
    methods: {
      toggleOpen: function () {
        this.open = !this.open;
      },
      addDie: function (type) {
        if (this.dicePool.hasOwnProperty(type)) {
          this.dicePool[type]++;
        }
      },
      removeDie: function (type) {
        if (this.dicePool.hasOwnProperty(type) && this.dicePool[type] > 0) {
          this.dicePool[type]--;
        }
      },
      resetDicePool: function () {
        this.dicePool.ability = 0;
        this.dicePool.proficiency = 0;
        this.dicePool.difficulty = 0;
        this.dicePool.challenge = 0;
        this.dicePool.boost = 0;
        this.dicePool.setback = 0;
        this.dicePool.force = 0;
      },
      rollDicePool: function () {
        var dicePoolRolls = {};

        _.each(this.dicePool, function (num, type) {
          if (num > 0) {
            dicePoolRolls[type] = rollDieGroup(type, num);
          }
        });

        this.rollHistory.unshift(new RollResult(dicePoolRolls));
      }
    }
  };

});
