
var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');
var socketHandler = require('./socketHandler.js');

// game menus
require('./crawlMenu/crawlMenu.js');
require('./playersMenu/playersMenu.js');
require('./settingsMenu/settingsMenu.js');

// sibling dependencies
require('../dicePool/dicePool.js');
require('../starWarsCrawl/starWarsCrawl.js');

module.exports = {
  template: require('./gameTemplate.html'),
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      // user data
      user: {},

      // game data
      game: {},
      gameLog: [],

      // interface pieces
      gameAlert: {},
      crawlModalOpen: false,
      playersModalOpen: false,
      settingsModalOpen: false,
      navigationOpen: false,
      confirmLogout: false,

      // crawl data
      selectedCrawlId: '',
      crawlTitle: '',
      crawlSubtitle: '',
      crawlCrawl: '',
      crawlImage: '',
      showCrawl: false,

      // chat data
      chatMessage: '',
      isScrolledToBottom: true,

      // dice pool
      rollDescription: '',
      ability: 0,
      proficiency: 0,
      difficulty: 0,
      challenge: 0,
      boost: 0,
      setback: 0,
      force: 0
    };
  },
  ready() {
    var self = this;

    // listen for game updates
    io.socket.on('game', function (message) {
      if (socketHandler.isValidMessage(message, self.game.id)) {
        if (socketHandler.player.hasOwnProperty(message.data.type)) {
          socketHandler.player[message.data.type](self.game, message.data.data, self.user);
        } else if (socketHandler.game.hasOwnProperty(message.data.type)) {
          socketHandler.game[message.data.type](self.game, message.data.data);
        } else if (socketHandler.gameLog.hasOwnProperty(message.data.type)) {
          socketHandler.gameLog[message.data.type](self.gameLog, message.data.data);

          // if this is a chat log message, adjust scrolling appropriately
          if (message.data.type === 'newLogMessage' && self.isScrolledToBottom) {
            Vue.nextTick(self.scrollChatToBottom);
          }
        }
      }
    });

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

    // get game data
    gameService.get(self.gameId)
      .then(function success(game) {
        self.game = game;
        self.initCrawlOptions();
      }, function error(reason) {
        return q.reject(reason);
      }).then(function () {
        return gameService.getLog(self.gameId);
      }).then(function success(log) {
        self.gameLog = log;
        Vue.nextTick(self.scrollChatToBottom);
        self.gameAlert.close();
      }, function error(reason) {
        self.gameAlert.error(reason);
      });
  },
  computed: {
    userIsGameMaster() {
      return this.game.gameMaster && this.game.gameMaster.id === this.user.id;
    },
    crawlOptions() {
      var self = this,
        crawlOptions = [];

      if (self.game && self.game.crawls) {
        _.forEach(self.game.crawls, function (crawl) {
          if (crawl.published) {
            crawlOptions.push({
              value: crawl.id,
              label: crawl.title
            });
          }
        });
      }

      return crawlOptions;
    },
    selectedCrawl() {
      var self = this,
        index = _.findIndex(self.game.crawls, function (crawl) {
          return crawl.id === self.selectedCrawlId;
        });

      return index > -1 ? self.game.crawls[index] : null;
    }
  },
  partials: {
    'players-pane': require('./partials/playersPane.html'),
    'crawl-pane': require('./partials/crawlPane.html'),
    'chat-pane': require('./partials/chatPane.html'),
    'roll-message': require('./partials/rollMessage.html'),
    'rolled-dice': require('./partials/rolledDice.html')
  },
  events: {
    [constants.events.game.closeCrawl]() {
      this.crawlModalOpen = false;
    },
    [constants.events.game.closePlayers]() {
      this.playersModalOpen = false;
    },
    [constants.events.game.closeSettings]() {
      this.settingsModalOpen = false;
    }
  },
  methods: {
    initCrawlOptions() {
      var self = this,
        crawlTimestamp = 0,
        crawlId,
        nextTimestamp;

      if (self.game.crawls.length > 0) {
        _.forEach(self.game.crawls, function (crawl) {
          nextTimestamp = moment(crawl.createdAt).valueOf();
          if (crawl.published && (!crawlId || nextTimestamp > crawlTimestamp)) {
            crawlId = crawl.id;
            crawlTimestamp = nextTimestamp;
          }
        });
      }

      if (crawlId) {
        self.selectedCrawlId = crawlId;
      }
    },
    playCrawl(crawl) {
      this.crawlTitle = crawl.title;
      this.crawlSubtitle = crawl.subtitle;
      this.crawlCrawl = crawl.crawl;
      this.crawlImage = crawl.imageUrl;
      this.showCrawl = true;
    },
    sendChatMessage() {
      var self = this;

      if (self.chatMessage.length > 0) {
        gameService.sendMessage(self.game, self.chatMessage)
          .then(function success() {
            self.chatMessage = '';
            self.gameAlert.close();
          }, function error(reason) {
            self.gameAlert.error(reason);
          });
      }
    },
    sendChatRoll() {
      var self = this,
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
          self.gameAlert.close();
        }, function error(reason) {
          self.gameAlert.error(reason);
        });
    },
    scrollChatToBottom() {
      // TODO Need to call this function when chat input tabs switch
      this.$els.chatLog.scrollTop = this.$els.chatLog.scrollHeight - this.$els.chatLog.offsetHeight;
    },
    userScrolling(event) {
      this.isScrolledToBottom = this.$els.chatLog.offsetHeight + this.$els.chatLog.scrollTop === this.$els.chatLog.scrollHeight;
    },
  }
};
