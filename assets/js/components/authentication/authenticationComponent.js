
module.exports = {
  template: require('./authenticationTemplate.html'),
  data: function () {
    return {
      greeting: 'authentication component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
