
define([
  'lodash',
  'q',
  'io',
  'constants',
  'service/channelService',
  'service/userService',
  'text!./rollChannelsTemplate.html'
], function (_, q, io, constants, channelService, userService, rollChannelsTemplate) {

  var events = {};

  events[constants.events.prompt.valueSubmitted] = function PromptValueSubmitted(data) {
    var self = this;

    if (data.value.length > 0) {
      switch (data.name) {
        case self.handlePrompt.name:
          self.setChatHandle(data.value);
          break;

        case self.joinChannelPrompt.name:
          self.joinChannel(data.value);
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
    computed: {
      channelLabel: function () {
        return (this.channel.name && this.channel.name.length > 0) ? this.channel.name : 'Roll Channel';
      }
    },
    methods: {
      clearLocalRolls: function () {
        this.localRolls = [];
      },
      openSetChatHandlePrompt: function () {
        this.$broadcast(constants.events.prompt.promptUser, this.handlePrompt.name);
      },
      openJoinChannelPrompt: function () {
        this.$broadcast(constants.events.prompt.promptUser, this.joinChannelPrompt.name);
      },
      setChatHandle: function (newHandle) {
        var self = this,
          deferred = q.defer();

        self.chatHandle = '';
        userService.setChatHandle(newHandle)
          .then(function success() {
            self.chatHandle = newHandle;
          }, function error(reason) {
            console.error(reason);
          }).done(function () { deferred.resolve(); });

        return deferred.promise;
      },
      joinChannel: function (channelName) {
        var self = this,
          deferred = q.defer();

        channelService.join(channelName)
          .then(function success(channelData) {
            self.channel = channelData.channel;
            self.channelLabel = channelData.channel.name;
            self.channelRolls = channelData.rolls.reverse();
          }, function error(reason) {
            console.error(reason);
          }).done(function () { deferred.resolve(); });

        return deferred.promise;
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
          }).done(function () { deferred.resolve(); });

        return deferred.promise;
      }
    }
  };

});
