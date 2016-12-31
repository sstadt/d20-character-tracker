
module.exports = {
  template: require('./chatTemplate.html'),
  data() {
    return {
      greeting: 'chat component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
