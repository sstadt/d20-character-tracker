
var constants = require('../../config/constants.js');
var gameService = require('../../services/gameService.js');

var events = {};

events[constants.events.prompt.valueSubmitted] = function PromptValueSubmitted(data) {
  var self = this;

  if (data.value.length > 0) {
    switch (data.name) {
      case self.newGamePrompt.name:
        self.newGame(data.value);
        break;
    }
  }
};

module.exports = {
  template: require('./gameBrowserTemplate.html'),
  events: events,
  data: function () {
    return {
      filter: '',
      searching: false,
      myGames: [],
      filteredGames: [],
      gameBrowserAlert: {},
      newGamePrompt: {
        name: 'game-browser-prompt__new-game',
        label: 'New Game'
      }
    };
  },
  ready: function () {
    var self = this;

    gameService.getMyGames()
      .then(function success(myGames) {
        self.myGames = myGames;
      }, self.gameBrowserAlert.error);
  },
  watch: {
    filter: _.debounce(function (val) {
      var self = this;

      if (val.length > 2) {
        self.searching = true;
        gameService.search(val)
          .then(function success(filteredGames) {
            self.filteredGames = filteredGames;
          }, self.gameBrowserAlert.error)
          .done(function () {
            self.searching = false;
          });
      }
    }, 400)
  },
  computed: {
    filterIcon: function () {
      return (this.searching) ? 'spinner fa-spin' : 'search';
    }
  },
  methods: {
    openNewGamePrompt: function () {
      this.$broadcast(constants.events.prompt.promptUser, this.newGamePrompt.name);
    },
    newGame: function (name) {
      var self = this;

      gameService.create(name)
        .then(function success(game) {
          self.myGames.push(game);
        }, self.gameBrowserAlert.error);
    }
  }
};
