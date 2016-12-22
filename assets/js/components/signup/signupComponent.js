
module.exports = {
  template: require('./signupTemplate.html'),
  data: function () {
    return {
      greeting: 'signup component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
