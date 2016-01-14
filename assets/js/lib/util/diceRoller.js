
define(function () {

  function getDieRoll(sides) {
    return Math.floor(Math.random() * sides) + 1;
  }

  function roll(num, sides) {
    var rolls = [];

    for (var i = 0; i < num; i++) {
      rolls.push(getDieRoll(sides));
    }

    return rolls;
  }

  return {
    roll: roll,
    rollSimple: function (num, sides) {
      return roll(num, sides).reduce(function (a, b) { return a + b; });
    }
  };
});

