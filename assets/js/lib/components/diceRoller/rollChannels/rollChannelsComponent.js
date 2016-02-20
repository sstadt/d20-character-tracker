
define([
  'lodash',
  'constants',
  'text!./rollChannelsTemplate.html',
  'sails'
], function (_, constants, rollChannelsTemplate) {

  return {
    template: rollChannelsTemplate,
    props: {
      channel: {
        type: Object,
        required: true,
        twoWay: true
      },
      chatHandle: {
        type: String,
        required: true,
        twoWay: true
      },
      localRolls: {
        type: Array,
        required: true
      },
      channelRolls: {
        type: Array,
        required: true
      }
    },
    ready: function () {
      var self = this;

      io.socket.on('channel', function (event) {
        self.channelRolls.unshift(event.data.newRoll);
      });
    },
    methods: {
      setChatHandle: function () {
        var self = this,
          newHandle = prompt('Enter a new chat handle:');

          if (newHandle) {
            io.socket.post('/setHandle', { handle: newHandle }, function (response) {
              self.chatHandle = newHandle;
            });
          }
      },
      joinChannel: function () {
        var self = this,
          channelName = prompt('Enter a channel name:');

        if (channelName) {
          io.socket.post('/channel/join', { name: channelName }, function (response) {
            self.channel = response.channel;
            self.channelRolls = response.rolls.reverse();
          });
        }
      }
    }
  };

});
