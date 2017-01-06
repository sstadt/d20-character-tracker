
module.exports = {
  template: require('./diceControlsTemplate.html'),
  data() {
    return {
      greeting: 'diceControls component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
