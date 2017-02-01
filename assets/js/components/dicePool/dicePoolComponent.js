
var config = require('../../lib/config.js');

var Service = require('../../classes/Service.js');

var gameService;

module.exports = {
  template: require('./dicePoolTemplate.html'),
  props: {
    game: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      droppable: false,
      rollDescription: '',
      dice: {
        ability: 0,
        proficiency: 0,
        difficulty: 0,
        challenge: 0,
        boost: 0,
        setback: 0,
        force: 0
      },
      lightToken: false,
      darkToken: false
    };
  },
  created() {
    var self = this;

    gameService = new Service({
      schema: config.endpoints.game,
      staticData: {
        gameId: self.game
      }
    });
  },
  methods: {
    roll() {
      var self = this,
        deferred = q.defer(),
        dicePool = {
          ability: self.dice.ability,
          proficiency: self.dice.proficiency,
          difficulty: self.dice.difficulty,
          challenge: self.dice.challenge,
          boost: self.dice.boost,
          setback: self.dice.setback,
          force: self.dice.force
        },
        tokens = {
          light: self.lightToken,
          dark: self.darkToken
        };

      if (self.hasDice()) {
        self.loading = true;
        gameService.sendRoll({ dicePool, description: self.rollDescription, tokens })
          .then(function success() {
            self.resetDicePool();
          }, function error(reason) {
            self.$emit('error', reason.err);
          })
          .done(function () {
            self.loading = false;
            deferred.resolve();
          });
      } else {
        deferred.resolve();
      }

      return deferred.promise;
    },
    hasDice() {
      var hasDice = false;

      for (var die in this.dice) {
        if (this.dice[die] > 0) {
          hasDice = true;
          break;
        }
      }

      return hasDice;
    },
    resetDicePool() {
      this.dice.ability = 0;
      this.dice.proficiency = 0;
      this.dice.difficulty = 0;
      this.dice.challenge = 0;
      this.dice.boost = 0;
      this.dice.setback = 0;
      this.dice.force = 0;
      this.lightToken = false;
      this.darkToken = false;
      this.rollDescription = '';
    },
    dropHandler(event) {
      var dropData = event.dataTransfer.getData("text");

      this.droppable = false;

      if (!_.isUndefined(this.dice[dropData])) {
        this.addDie(dropData);
      }

      if (dropData === 'light-token' || dropData === 'dark-token') {
        this.addToken(dropData.split('-')[0]);
      }
    },
    addToken(type) {
      if (!_.isUndefined(this[`${type}Token`]) && this[`${type}Token`] === false) {
        if (type === 'light' && this.dice.ability > 0) {
          this.dice.ability--;
          this.dice.proficiency++;
          this.lightToken = true;
        } else if (type === 'dark' && this.dice.difficulty > 0) {
          this.dice.difficulty--;
          this.dice.challenge++;
          this.darkToken = true;
        }
      }
    },
    removeToken(type) {
      if (type === 'light') {
        this.lightToken = false;

        if (this.dice.proficiency > 0) {
          this.dice.proficiency--;
          this.dice.ability++;
        }
      } else if (type === 'dark') {
        this.darkToken = false;

        if (this.dice.challenge > 0) {
          this.dice.challenge--;
          this.dice.difficulty++;
        }
      }
    },
    addDie(type) {
      if (!_.isUndefined(this.dice[type])) {
        this.dice[type]++;
      }
    },
    removeDie(type) {
      if (!_.isUndefined(this.dice[type])) {
        this.dice[type]--;

        if (this.dice.proficiency < 1 && this.lightToken === true) {
          this.lightToken = false;
        }

        if (this.dice.challenge < 1 && this.darkToken === true) {
          this.darkToken = false;
        }
      }
    },
    dragEnter() {
      this.droppable = true;
    },
    dragLeave() {
      this.droppable = false;
    }
  }
};
