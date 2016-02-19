
define([
  'constants',
  'text!./diceRollerTemplate.html',
  'sails'
], function (constants, diceRollerTemplate) {

  return {
    template: diceRollerTemplate,
    data: function () {
      return {
        description: '',
        ability: 0,
        proficiency: 0,
        difficulty: 0,
        challenge: 0,
        boost: 0,
        setback: 0,
        force: 0
      };
    },
    methods: {
      roll: function () {
        var self = this,
          roll = {
            description: self.description,
            ability: parseInt(self.ability, 10),
            proficiency: parseInt(self.proficiency, 10),
            difficulty: parseInt(self.difficulty, 10),
            challenge: parseInt(self.challenge, 10),
            boost: parseInt(self.boost, 10),
            setback: parseInt(self.setback, 10),
            force: parseInt(self.force, 10)
          };

        console.log(roll.description);

        io.socket.get('/roll', roll, function (response) {
          self.$parent.$broadcast(constants.events.diceRoller.newLocalRoll, response);
        });
      }
    }
  };

});
