
var util = require('../../lib/util.js');
var http = require('../../lib/util.http.js');
var config = require('../../lib/config.js');

var Pipe = require('../../classes/Pipe.js');
var Service = require('../../classes/Service.js');

var userService = require('../../services/userService.js');

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

      // map data
      maps: [],
      activeMap: 0,

      // npc data
      npcs: [],

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
      }],
      gameService: undefined
    };
  },
  components: {
    npcMenu: require('./npcMenu/npcMenuComponent.js'),
    mapMenu: require('./mapMenu/mapMenuComponent.js'),
    crawlMenu: require('./crawlMenu/crawlMenuComponent.js'),
    playersMenu: require('./playersMenu/playersMenuComponent.js'),
    settingsMenu: require('./settingsMenu/settingsMenuComponent.js')
  },
  computed: {
    userIsGameMaster() {
      return this.game.gameMaster && this.game.gameMaster.id === this.user.id;
    },
    gameMasterIsOnline() {
      return this.game.online && this.game.online.indexOf(this.game.gameMaster.id) > -1;
    },
    lightTokens() {
      return !_.isUndefined(this.game.lightTokens) ? this.game.lightTokens : 0;
    },
    darkTokens() {
      return !_.isUndefined(this.game.darkTokens) ? this.game.darkTokens : 0;
    },
    displayMap() {
      var self = this,
        map = _.find(self.maps, function (map) {
          return map.id === self.activeMap;
        });

      return (!_.isUndefined(map)) ? map : {};
    }
  },
  filters: {
    playerIsOnline(player) {
      return this.game.online.indexOf(player.id) > -1;
    }
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.gameId
      }
    });

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
      });

    // get game data
    self.gameService.getGame()
      .then(function (game) {
        self.game = game;
        return self.gameService.getLog();
      }).then(function success(log) {
        self.gameLog = log;
        return self.gameService.getNpcs();
      }).then(function success(npcs) {
        self.npcs = npcs;
        return self.gameService.getMaps();
      }).then(function success(maps) {
        self.maps = maps;
      }, function error(reason) {
        self.$refs.notifications.error(reason);
      })
      .done(function () {
        self.initGamePipe();
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

    /*
      Jukebox
      --------------------------------
     */
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

    /*
      Dice Rolls
      --------------------------------
     */
    addDieToPool(type) {
      this.$refs.dicePool.addDie(type);
    },
    rollDestinyPool() {
      var deferred = q.defer(),
        self = this;

      self.gameService.rollDestinyPool({ numPlayers: self.game.players.length })
        .fail(function (reason) {
          self.$refs.notifications.alert(reason);
          deferred.resolve();
        });

      return deferred.promise;
    },

    /*
      Maps
      --------------------------------
     */
    setActiveMap(id) {
      this.activeMap = id;
    },
    clearActiveMap() {
      this.activeMap = 0;
    },

    /*
      Socket Updates
      --------------------------------
     */
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
      GamePipe.on('playerConfigUpdated', this.playerConfigUpdated);
      GamePipe.on('destinyPoolUpdated', this.destinyPoolUpdated);
      GamePipe.on('mapAdded', this.mapAdded);
      GamePipe.on('mapRemoved', this.mapRemoved);
      GamePipe.on('mapUpdated', this.mapUpdated);
      GamePipe.on('mapTokenAdded', this.mapTokenAdded);
      GamePipe.on('mapTokenRemoved', this.mapTokenRemoved);
      GamePipe.on('mapTokenMoved', this.mapTokenMoved);
      GamePipe.on('npcAdded', this.npcAdded);
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
      var playerIndex = util.getIndexById(this.game.players, data.player);

      if (playerIndex > -1) {
        this.$refs.notifications.message(`${this.game.players[playerIndex].chatHandle} has logged in`);
      }

      if (this.game.online.indexOf(data.player) === -1) {
        this.game.online.push(data.player);
      }
    },
    playerOffline(data) {
      var onlineIndex = this.game.online.indexOf(data.player),
        playerIndex = util.getIndexById(this.game.players, data.player);

      if (playerIndex > -1) {
        this.$refs.notifications.message(`${this.game.players[playerIndex].chatHandle} has logged out`);
      }

      if (onlineIndex > -1) {
        this.game.online.splice(onlineIndex, 1);
      }
    },
    playerConfigUpdated(data) {
      var playerIndex = util.getIndexById(this.game.players, data.user);

      if (playerIndex > -1 && !_.isUndefined(data.config)) {
        this.game.players[playerIndex].config = data.config;
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
    },
    destinyPoolUpdated(data) {
      this.game.lightTokens = data.light || 0;
      this.game.darkTokens = data.dark || 0;
    },
    mapAdded(data) {
      this.maps.push(data.map);
    },
    mapRemoved(data) {
      var mapIndex = util.getIndexById(this.maps, data.map);

      if (mapIndex > -1) {
        this.maps.splice(mapIndex, 1);
      }
    },
    mapUpdated(data) {
      if (_.isObject(data.map)) {
        var mapIndex = util.getIndexById(this.maps, data.map.id);

        if (mapIndex > -1) {
          this.maps.splice(mapIndex, 1, _.extend(data.map));
        }
      }
    },
    mapTokenAdded(data) {
      var mapIndex = util.getIndexById(this.maps, data.mapId);

      if (mapIndex > -1) {
        this.maps[mapIndex].tokens.push(data.token);
      }
    },
    mapTokenRemoved(data) {
      var mapIndex = util.getIndexById(this.maps, data.mapId),
        tokenIndex = (mapIndex === -1) ? -1 : util.getIndexById(this.maps[mapIndex].tokens, data.tokenId);

      if (tokenIndex > -1) {
        this.maps[mapIndex].tokens.splice(tokenIndex, 1);
      }
    },
    mapTokenMoved(data) {
      var mapIndex = util.getIndexById(this.maps, data.mapId),
        tokenIndex = (mapIndex === -1) ? -1 : util.getIndexById(this.maps[mapIndex].tokens, data.token.id);

      if (tokenIndex > -1) {
        this.maps[mapIndex].tokens[tokenIndex].x = data.token.x;
        this.maps[mapIndex].tokens[tokenIndex].y = data.token.y;
      }
    },
    npcAdded(data) {
      this.npcs.push(data.npc);
    }

  }
};
