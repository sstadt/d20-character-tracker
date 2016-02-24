
define([
  'constants',
  'io',
  'text!./diceRollerTemplate.html',
  './rollChannels/rollChannels',
  './rollLog/rollLog',
  'component/dieCounter/dieCounter'
], function (constants, io, diceRollerTemplate) {

  return {
    template: diceRollerTemplate,
    props: {
      chatHandle: {
        type: String,
        required: true
      }
    },
    data: function () {
      return {
        description: '',
        ability: 0,
        proficiency: 0,
        difficulty: 0,
        challenge: 0,
        boost: 0,
        setback: 0,
        force: 0,
        channel: { label: 'Roll Channel' },
        localRolls: [],
        channelRolls: []
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

        if (self.channel.id) {
          roll.channel = self.channel.id;
        }

        io.socket.get(constants.endpoints.dice.roll, roll, function (response) {
          self.localRolls.unshift(response);
        });
      }
    }
  };

});
