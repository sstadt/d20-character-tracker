
module.exports = {
  template: require('./dicePoolTemplate.html'),
  data() {
    return {
      ability: 0,
      proficiency: 0,
      difficulty: 0,
      challenge: 0,
      boost: 0,
      setback: 0,
      force: 0
    };
  },
  methods: {
    roll() {
      console.log('roll dice');
    }
  }
};
