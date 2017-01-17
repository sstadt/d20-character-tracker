
module.exports = {
  template: require('./gamesTemplate.html'),
  data() {
    return {
      greeting: 'games component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
