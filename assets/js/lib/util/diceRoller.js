

define(function () {

    function getDieRoll(sides) {
        return Math.floor(Math.random() * sides) + 1;
    }

    return {
        roll: function (num, sides) {
            var rolls = [];

            for (var i = 0; i < num; i++) {
                rolls.push(getDieRoll(sides));
            }

            return rolls;
        }
    };
});

