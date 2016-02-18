
define([
  'constants',
  'text!./rollChannelTemplate.html'
], function (constants, rollChannelTemplate) {

  var events = {};

  events[constants.events.diceRoller.newLocalRoll] = function AddLocalRoll(roll) {
    this.rolls.push(roll);
    console.log('new roll received');
    console.log(this.rolls);
  };

  return {
    template: rollChannelTemplate,
    events: events,
    data: function () {
      return {
        rolls: [],
      };
    },
    methods: {
    }
  };

});
