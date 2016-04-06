
var resultTypes = sails.config.taskDice.resultTypes,
  dieResults = sails.config.taskDice.dieResults;

function getDieRoll(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function getRollResult(type) {
  var roll;

  if (dieResults.hasOwnProperty(type)) {
    roll = getDieRoll(dieResults[type].length);
  }

  return _.clone(dieResults[type][roll-1]);
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
