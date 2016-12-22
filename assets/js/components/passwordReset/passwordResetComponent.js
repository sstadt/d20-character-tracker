
module.exports = {
  template: require('./passwordResetTemplate.html'),
  data: function () {
    return {
      greeting: 'passwordReset component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
