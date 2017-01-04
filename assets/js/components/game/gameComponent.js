
// TODO: Build out notifications component and pump alert messages there instead of an alert

var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');
var socketHandler = require('./gameSocketHandler.js');

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

      // crawl data
      selectedCrawlId: '',
      activeCrawl: {
        title: '',
        subtitle: '',
        crawl: '',
        image: '',
        show: false
      },

      playlist: [
        {
          name: 'crawl',
          src: 'https://s3-us-west-2.amazonaws.com/scottstadtcom/fad/star_wars_crawl.mp3'
        }
      ]
    };
  },
  components: {
    crawlMenu: require('./crawlMenu/crawlMenuComponent.js'),
    playersMenu: require('./playersMenu/playersMenuComponent.js'),
    settingsMenu: require('./settingsMenu/settingsMenuComponent.js')
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
    },
    gameMasterIsOnline() {
      return this.game.online.indexOf(this.game.gameMaster.id) > -1;
    }
  },
  filters: {
    playerIsOnline(player) {
      return this.game.online.indexOf(player.id) > -1;
    }
  },
  created() {
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
        // Vue.nextTick(self.scrollChatToBottom);
        self.$refs.gameAlert.close();
      }, function error(reason) {
        self.$refs.gameAlert.error(reason);
      });
  },
  methods: {
    closeMenu(type) {
      this.$refs[`${type}Dialog`].close();
    },
    openMenu(type) {
      this.$refs[`${type}Dialog`].open();
    },
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
      this.activeCrawl.title = crawl.title;
      this.activeCrawl.subtitle = crawl.subtitle;
      this.activeCrawl.crawl = crawl.crawl;
      this.activeCrawl.image = crawl.imageUrl;
      this.$refs.crawl.play();
    },
    playMusic(track) {
      this.$refs.jukebox.playTrack(track);
    },
    stopMusic(track) {
      this.$refs.jukebox.stopTrack(track);
    },
    trackFinished(track) {
      if (track === 'crawl') {
        this.$refs.crawl.endCrawl();
      }
    }
  }
};
