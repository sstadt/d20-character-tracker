
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
  dieTypes = [
    'ability',
    'proficiency',
    'difficulty',
    'challenge',
    'boost',
    'setback',
    'force'
  ],
  taskDieResults = {
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
      { triumph: 1 },               // 12
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

function getDieRoll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getRollResult(type) {
  var roll;

  if (taskDieResults.hasOwnProperty(type)) {
    roll = getDieRoll(taskDieResults[type].length);
  }

  return _.clone(taskDieResults[type][roll-1]);
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
        overallResults[resultName] += num;
      });
    });
  });

  this.description = data.description || '';
  this.overallResults = _.clone(overallResults);
  this.results = _.clone(data);
}


module.exports = {
  roll: function (description, pool) {
    var dicePoolRolls = {};

    _.each(pool, function (num, type) {
      if (num > 0) {
        dicePoolRolls[type] = rollDieGroup(type, num);
      }
    });

    dicePoolRolls.description = description;

    return new RollResult(dicePoolRolls);
  }
};

