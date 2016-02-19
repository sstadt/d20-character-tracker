
define([
  'lodash',
  'constants',
  'text!./rollChannelTemplate.html'
], function (_, constants, rollChannelTemplate) {

  var events = {};

  events[constants.events.diceRoller.newLocalRoll] = function AddLocalRoll(roll) {
    this.myRolls.unshift(roll);
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
