
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
      localRolls: {
        type: Array,
        required: true
      },
      channelRolls: {
        type: Array,
        required: true
      }
    },
    methods: {
      joinChannel: function () {
        var channel = prompt('Enter a channel name:');

        io.socket.post('/channel/join', { name: channel }, function (channel) {
          this.channel = channel;
        });
      }
    }
  };

});
