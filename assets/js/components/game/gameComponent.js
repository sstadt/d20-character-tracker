
var Pipe = require('../../classes/Pipe.js');

var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

var util = require('../../lib/util.js');
var http = require('../../lib/util.http.js');


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
      activeCrawl: {
        title: '',
        subtitle: '',
        crawl: '',
        image: '',
        show: false
      },

      playlist: [{
        name: 'crawl',
        src: 'https://s3-us-west-2.amazonaws.com/scottstadtcom/fad/star_wars_crawl.mp3'
      }]
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

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

    // get game data
    gameService.get(self.gameId)
      .then(function success(game) {
        self.game = game;
        self.initGamePipe();
      }, function error(reason) {
        return q.reject(reason);
      }).then(function () {
        return gameService.getLog(self.gameId);
      }).then(function success(log) {
        self.gameLog = log;
      }, function error(reason) {
        self.$refs.notifications.error(reason);
      });
  },
  methods: {
    closeMenu(type) {
      this.$refs[`${type}Dialog`].close();
    },
    openMenu(type) {
      this.$refs[`${type}Dialog`].open();
    },
    notifyError(message) {
      this.$refs.notifications.alert(message);
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
    },
    addDieToPool(type) {
      this.$refs.dicePool.addDie(type);
    },
    initGamePipe() {
      var GamePipe = new Pipe('game');

      GamePipe.on('playerRequestedJoin', this.playerRequestedJoin);
      GamePipe.on('playerJoinApproved', this.playerJoinApproved);
      GamePipe.on('playerJoinDeclined', this.playerJoinDeclined);
      GamePipe.on('playerRemoved', this.playerRemoved);
      GamePipe.on('playerOnline', this.playerOnline);
      GamePipe.on('playerOffline', this.playerOffline);
      GamePipe.on('gameCrawlAdded', this.gameCrawlAdded);
      GamePipe.on('gameCrawlUpdated', this.gameCrawlUpdated);
      GamePipe.on('gameCrawlDestroyed', this.gameCrawlDestroyed);
      GamePipe.on('newLogMessage', this.newLogMessage);
    },
    playerRequestedJoin(data) {
      this.game.requestingPlayers.push(data.player);
    },
    playerJoinApproved(data) {
      var playerIndex = util.getIndexById(this.game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        this.game.requestingPlayers.splice(playerIndex, 1);
      }

      this.game.players.push(data.player);
    },
    playerJoinDeclined(data) {
      var playerIndex = util.getIndexById(this.game.requestingPlayers, data.player.id);

      if (playerIndex > -1) {
        this.game.requestingPlayers.splice(playerIndex, 1);
      }
    },
    playerRemoved(data) {
      var playerIndex = util.getIndexById(this.game.players, data.player.id);

      if (playerIndex > -1) {
        this.game.players.splice(playerIndex, 1);
      }

      if (data.player.id === this.user.id) {
        if (confirm('ready to redirect?')) {
          http.setLocation('/home');
        }
      }
    },
    playerOnline(data) {
      if (this.game.online.indexOf(data.player) === -1) {
        this.game.online.push(data.player);
      }
    },
    playerOffline(data) {
      var index = this.game.online.indexOf(data.player);

      if (index > -1) {
        this.game.online.splice(index, 1);
      }
    },
    gameCrawlAdded(data) {
      var crawl = data.crawl;

      if (_.isObject(crawl)) {
        this.game.crawls.push(crawl);
      }
    },
    gameCrawlUpdated(data) {
      if (_.isObject(data.crawl)) {
        var crawlIndex = util.getIndexById(this.game.crawls, data.crawl.id);

        if (crawlIndex > -1) {
          this.game.crawls.splice(crawlIndex, 1, _.extend(data.crawl));
        }
      }
    },
    gameCrawlDestroyed(data) {
      var crawlIndex = util.getIndexById(this.game.crawls, data.crawl);

      if (crawlIndex > -1) {
        this.game.crawls.splice(crawlIndex, 1);
      }
    },
    newLogMessage(data) {
      this.gameLog.log.push(data);
      Vue.nextTick(self.scrollChatToBottom);
    }
  }
};
