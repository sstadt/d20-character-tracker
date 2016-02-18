
define([
  'text!./diceRollerTemplate.html',
  'sails'
], function (diceRollerTemplate) {

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
        var self = this;

        io.socket.get('/roll', {
          ability: parseInt(self.ability, 10),
          proficiency: parseInt(self.proficiency, 10),
          difficulty: parseInt(self.difficulty, 10),
          challenge: parseInt(self.challenge, 10),
          boost: parseInt(self.boost, 10),
          setback: parseInt(self.setback, 10),
          force: parseInt(self.force, 10)
        }, function (response) {
          console.log(response);
        });
      }
    }
  };

});
