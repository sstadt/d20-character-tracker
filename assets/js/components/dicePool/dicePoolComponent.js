
var gameService = require('../../services/gameService.js');

module.exports = {
  template: require('./dicePoolTemplate.html'),
  props: {
    game: {
      type: String,
      defaultsTo: ''
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
      }
    };
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
        };

      if (self.hasDice()) {
        self.loading = true;
        gameService.sendRoll(self.game, dicePool, self.rollDescription)
          .then(function success() {
            self.resetDicePool();
          }, function error(reason) {
            self.$emit('error', reason);
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
      this.rollDescription = '';
    },
    addDie(type) {
      if (this.dice[type] !== undefined) {
        this.dice[type]++;
      }
    },
    addDieByDrag(event) {
      var type = event.dataTransfer.getData("text");

      this.droppable = false;
      this.addDie(type);
    },
    removeDie(type) {
      if (this.dice[type] !== undefined) {
        this.dice[type]--;
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
