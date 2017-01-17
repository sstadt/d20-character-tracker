
module.exports = {
  template: require('./profileTemplate.html'),
  data() {
    return {
      greeting: 'profile component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
