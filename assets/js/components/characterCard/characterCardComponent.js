
module.exports = {
  template: require('./characterCardTemplate.html'),
  data() {
    return {
      greeting: 'characterCard component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
