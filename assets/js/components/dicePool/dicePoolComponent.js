
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
