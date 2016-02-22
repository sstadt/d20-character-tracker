
define([
  'lodash',
  'constants',
  'text!./rollChannelsTemplate.html',
  'sails'
], function (_, constants, rollChannelsTemplate) {

  var events = {};

  events[constants.events.prompt.valueSubmitted] = function PromptValueSubmitted(data) {
    var self = this;

    if (data.value.length > 0) {
      switch (data.name) {
        case this.handlePrompt.name:
          self.chatHandle = '';
          io.socket.post('/setHandle', { handle: data.value }, function (response) {
            self.chatHandle = data.value;
          });
          break;
        case this.joinChannelPrompt.name:
          io.socket.post('/channel/join', { name: data.value }, function (response) {
            self.channel = response.channel;
            self.channelRolls = response.rolls.reverse();
          });
          break;
      }
    }
  }; 

  return {
    template: rollChannelsTemplate,
    events: events,
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
    data: function () {
      return {
        joinChannelPrompt: {
          name: 'join-channel-prompt',
          label: ''
        },
        handlePrompt: {
          name: 'chat-handle-prompt',
          label: ''
        }
      };
    },
    ready: function () {
      var self = this;

      io.socket.on('channel', function (event) {
        self.channelRolls.unshift(event.data.newRoll);
      });
    },
    methods: {
      setChatHandle: function () {
        this.handlePrompt.label = 'Enter new chat handle';
      },
      joinChannel: function () {
        this.joinChannelPrompt.label = 'Enter a channel name';
      }
    }
  };

});
