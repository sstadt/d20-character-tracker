
module.exports = {
  template: require('./loginTemplate.html'),
  data: function () {
    return {
      greeting: 'login component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
