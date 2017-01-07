
module.exports = {
  template: require('./dicePoolTemplate.html'),
  data() {
    return {
      droppable: false,
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
      console.log('roll dice');
    },
    addDie(event) {
      var die = event.dataTransfer.getData("text");

      this.droppable = false;
      if (this.dice[die] !== undefined) {
        this.dice[die]++;
      }
    },
    dragEnter() {
      this.droppable = true;
    },
    dragLeave() {
      this.droppable = false;
    },
    decrement(type) {
      this.dice[type]--;
    }
  }
};
