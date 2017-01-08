
var gameService = require('../../services/gameService.js');

module.exports = {
  template: require('./chatTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    },
    log: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      chatMessage: '',
      isScrolledToBottom: true,
    };
  },
  created() {
    this.scrollChatToBottom();
  },
  watch: {
    log() {
      this.scrollChatToBottom();
    }
  },
  components: {
    chatRoll: require('./chatRoll/chatRollComponent.js')
  },
  methods: {
    sendChatMessage() {
      var self = this,
        deferred = q.defer();

      if (self.chatMessage.length > 0) {
        gameService.sendMessage(self.game, self.chatMessage)
          .then(function success() {
            self.chatMessage = '';
          }, function error(reason) {
            self.$emit('error', reason);
          })
          .done(function () {
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    playCrawl(crawl) {
      this.$emit('play-crawl', crawl);
    },
    scrollChatToBottom() {
      var self = this;

      if (this.isScrolledToBottom) {
        Vue.nextTick(function () {
          self.$refs.chatLog.scrollTop = self.$refs.chatLog.scrollHeight - self.$refs.chatLog.offsetHeight;
        });
      }
    },
    userScrolling(event) {
      var scrollPos = this.$refs.chatLog.offsetHeight + this.$refs.chatLog.scrollTop;
      this.isScrolledToBottom = Math.abs(this.$refs.chatLog.scrollHeight - scrollPos) <= 10;
    }
  }
};
