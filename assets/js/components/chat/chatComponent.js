
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
      // chat data
      chatMessage: '',
      isScrolledToBottom: true,

      // dice pool
      // rollDescription: '',
      // ability: 0,
      // proficiency: 0,
      // difficulty: 0,
      // challenge: 0,
      // boost: 0,
      // setback: 0,
      // force: 0
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
    sendChatRoll() {
      var self = this,
        deferred = q.defer(),
        dicePool = {
          ability: self.ability,
          proficiency: self.proficiency,
          difficulty: self.difficulty,
          challenge: self.challenge,
          boost: self.boost,
          setback: self.setback,
          force: self.force
        };

      gameService.sendRoll(self.game, self.rollDescription, dicePool)
        .then(function success() {
          self.rollDescription = '';
        }, function error(reason) {
          self.$emit('error', reason);
        })
        .done(function () {
          deferred.resolve();
        });

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
