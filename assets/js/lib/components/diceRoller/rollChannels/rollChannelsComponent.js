
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
        case self.handlePrompt.name:
          self.chatHandle = '';
          io.socket.post('/setHandle', { handle: data.value }, function (response) {
            self.chatHandle = data.value;
          });
          break;
        case self.joinChannelPrompt.name:
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
        required: true,
        twoWay: true
      },
      channelRolls: {
        type: Array,
        required: true
      }
    },
    data: function () {
      return {
        joinChannelPrompt: {
          name: 'roll-channels-prompt__join-channel',
          label: 'Enter new channel name'
        },
        handlePrompt: {
          name: 'roll-channels-prompt__new-chat-handle',
          label: 'Enter a chat handle'
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
        this.$broadcast(constants.events.prompt.promptUser, this.handlePrompt.name);
      },
      joinChannel: function () {
        this.$broadcast(constants.events.prompt.promptUser, this.joinChannelPrompt.name);
      },
      clearLocalRolls: function () {
        this.localRolls = [];
      }
    }
  };

});
