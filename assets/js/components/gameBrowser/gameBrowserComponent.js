
var config = require('../../lib/config.js');
var util = require('../../lib/util.js');

var Pipe = require('../../classes/Pipe.js');
var Service = require('../../classes/Service.js');

var userService = require('../../services/userService.js');

// TODO: switch alert messages over to a notification

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  data() {
    return {
      user: {},
      filter: '',
      searching: false,
      myGames: [],
      filteredGames: [],
      gameBrowserPrompt: {
        value: '',
        error: ''
      },
      gameService: undefined
    };
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game
    });

    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
        self.initUserPipe();
      });

    self.gameService.getMyGames()
      .then(function success(myGames) {
        self.myGames = myGames;
      }, function error(reason) {
        self.$refs.notifications.error(reason.err);
      });
  },
  watch: {
    filter: _.debounce(function (val) {
      var self = this;

      if (val.length > 2) {
        self.searching = true;
        self.gameService.search({ filter: val })
          .then(function success(filteredGames) {
            self.filteredGames = _.extend(filteredGames);
          }, function (reason) {
            self.$refs.notifications.error(reason.err);
          })
          .done(function () {
            self.searching = false;
          });
      }
    }, 400)
  },
  computed: {
    filterIcon() {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    newGame() {
      this.$refs.gameBrowserPrompt.open();
    },
    addNewGame() {
      var self = this,
        title = self.gameBrowserPrompt.value;

      if (name !== '') {
        self.gameService.create({ title })
          .then(function success(game) {
            self.myGames.push(game);
          }, function (reason) {
            self.$refs.notifications.error(reason.err);
          });
      } else {
        self.gameBrowserPrompt.error = 'Game name cannot be empty';
      }
    },
    gameListError(message) {
      self.$refs.notifications.error(message);
    },
    initUserPipe() {
      var UserPipe = new Pipe('user');

      UserPipe.on('playerJoinApproved', this.playerJoinApproved);
      UserPipe.on('playerJoinDeclined', this.playerJoinDeclined);
      UserPipe.on('removedFromGame', this.removedFromGame);
    },
    playerJoinApproved(data) {
      var filteredGamesIndex = util.getIndexById(this.filteredGames, data.game.id),
        userIndex = util.getIndexById(this.filteredGames[filteredGamesIndex].requestingPlayers, this.user.id);

      this.myGames.push(data.game);

      if (filteredGamesIndex > -1) {
        this.filteredGames[filteredGamesIndex].requestingPlayers.splice(userIndex, 1);
        this.filteredGames[filteredGamesIndex].players.push(this.user);
      }
    },
    playerJoinDeclined(data) {
      var filteredGamesIndex = util.getIndexById(this.filteredGames, data.game.id),
        userIndex = util.getIndexById(this.filteredGames[filteredGamesIndex].requestingPlayers, this.user.id);

      if (filteredGamesIndex > -1) {
        this.filteredGames[filteredGamesIndex].requestingPlayers.splice(userIndex, 1);
      }
    },
    removedFromGame(data) {
      var filteredGamesIndex = util.getIndexById(this.filteredGames, data.game.id),
        myGamesIndex = util.getIndexById(this.myGames, data.game.id),
        userIndex = util.getIndexById(this.filteredGames[filteredGamesIndex].players, this.user.id);

      if (filteredGamesIndex > -1) {
        this.filteredGames[filteredGamesIndex].players.splice(userIndex, 1);
      }

      if (myGamesIndex > -1) {
        this.myGames.splice(myGamesIndex, 1);
      }
    }
  }
};
