
var resultTypes = sails.config.taskDice.resultTypes,
  dieTypes = sails.config.taskDice.dieTypes,
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

function RollResult(data, description) {
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

  this.type = 'task';
  this.description = description;
  this.overallResults = _.clone(overallResults);
  this.results = _.clone(data);
}

module.exports = {
  isValidTaskRoll: function (pool) {
    var hasInvalidProp = false,
      hasPositiveDieQuantity = false;

    _.forEach(pool, function (dieQuantity, dieName) {
      var dieTypeIndex = _.findIndex(dieTypes, function (type) {
        return type === dieName;
      });

      if (dieTypeIndex === -1) {
        hasInvalidProp = true;
      }

      if (!_.isNumber(dieQuantity)) {
        hasInvalidProp = true;
      } else if (dieQuantity > 0) {
        hasPositiveDieQuantity = true;
      }
    });

    return !hasInvalidProp && hasPositiveDieQuantity;
  },
  isValidStandardRoll: function (pool) {
    return pool.hasOwnProperty('sides');
  },
  roll: function (description, pool) {
    return this.isValidTaskRoll(pool) ? this.taskRoll(description, pool) : this.standardRoll(description, pool);
  },
  taskRoll: function (description, pool) {
    var dicePoolRolls = {};

    _.each(pool, function (num, type) {
      if (num > 0) {
        dicePoolRolls[type] = rollDieGroup(type, num);
      }
    });

    return new RollResult(dicePoolRolls, description);
  },
  standardRoll: function (description, pool) {
    var results = [],
      count = pool.count || 1,
      mod = pool.mod || 0,
      dice = count + 'd' + pool.sides,
      total;

    if (mod > 0) {
      dice += '+' + mod;
    }

    for (var i = 0; i < count; i++) {
      results.push(getDieRoll(pool.sides));
    }

    total = results.reduce(function (p, c) {
      return p + c;
    }) + mod;

    return {
      type: 'standard',
      dice: dice,
      description: description,
      results: results,
      total: total
    };
  }
};
