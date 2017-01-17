
module.exports = {
  template: require('./charactersTemplate.html'),
  data() {
    return {
      greeting: 'characters component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
