

define(function () {

    function getDieRoll(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    return {
        rollSimple: function (num, sides) {
            return this.roll(num, sides).reduce(function (a, b) { return a + b; });
        },
        roll: function (num, sides) {
            var rolls = [];

            for (var i = 0; i < num; i++) {
                rolls.push(getDieRoll(sides));
            }

            return rolls;
        }
    };
});

