
module.exports = {
  template: require('./imageFinderTemplate.html'),
  data() {
    return {
      greeting: 'imageFinder component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
