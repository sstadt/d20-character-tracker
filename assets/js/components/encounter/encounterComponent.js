
module.exports = {
  template: require('./encounterTemplate.html'),
  data() {
    return {
      greeting: 'encounter component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
