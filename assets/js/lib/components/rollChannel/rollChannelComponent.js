
define([
  'lodash',
  'constants',
  'text!./rollChannelTemplate.html'
], function (_, constants, rollChannelTemplate) {

  var events = {};

  events[constants.events.diceRoller.newLocalRoll] = function AddLocalRoll(roll) {
    this.myRolls.push(roll);
    console.log('new roll received');
    console.log(this.myRolls);
  };

  return {
    template: rollChannelTemplate,
    events: events,
    data: function () {
      return {
        myRolls: [],
        channelRolls: []
      };
    }
  };

});
