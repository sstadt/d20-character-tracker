
define([
  'lodash',
  'q',
  'constants',
  'io',
  'service/channelService',
  'service/userService',
  'text!./rollChannelsTemplate.html'
], function (_, q, constants, io, channelService, userService, rollChannelsTemplate) {

  var events = {};

  events[constants.events.prompt.valueSubmitted] = function PromptValueSubmitted(data) {
    var self = this,
      deferred = q.defer();

    if (data.value.length > 0) {
      switch (data.name) {
        case self.handlePrompt.name:
          self.chatHandle = '';
          userService.setChatHandle(data.value)
            .then(function success(newHandle) {
              self.chatHandle = data.value;
            }, function error(reason) {
              console.error(reason);
            })
            .done(function () { deferred.resolve(); });

          break;
        case self.joinChannelPrompt.name:
          channelService.join(data.value)
            .then(function success(channelData) {
              self.channel = channelData.channel;
              self.channelLabel = channelData.channel.name;
              self.channelRolls = channelData.rolls.reverse();
            }, function error(reason) {
              console.error(reason);
            }).done(function () { deferred.resolve(); });

          break;
        default:
          deferred.resolve();
      }
    } else {
      deferred.resolve();
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
    computed: {
      channelLabel: function () {
        return (this.channel.name && this.channel.name.length > 0) ? this.channel.name : 'Roll Channel';
      }
    },
    methods: {
      clearLocalRolls: function () {
        this.localRolls = [];
      },
      setChatHandle: function () {
        this.$broadcast(constants.events.prompt.promptUser, this.handlePrompt.name);
      },
      joinChannel: function () {
        this.$broadcast(constants.events.prompt.promptUser, this.joinChannelPrompt.name);
      },
      leaveChannel: function () {
        var self = this,
          deferred = q.defer();

        channelService.leave(self.channel.id)
          .then(function success() {
            self.channel = {};
            self.channelRolls = [];
          }, function error(reason) {
            console.error(reason);
          })
          .done(function () { deferred.resolve(); });

        return deferred.promise;
      }
    }
  };

});
