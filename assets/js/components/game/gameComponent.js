
var gameService = require('../../services/gameService.js');

module.exports = {
  template: require('./gameTemplate.html'),
  props: {
    gameId: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      game: {}
    };
  },
  ready: function () {
    var self = this;

    gameService.get(this.gameId)
      .then(function (game) {
        self.game = game;
      });
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
