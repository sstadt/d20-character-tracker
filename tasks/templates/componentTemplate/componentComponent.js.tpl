
module.exports = {
  template: require('./<%- name %>Template.html'),
  data: function () {
    return {
      greeting: '<%- name %> component',
    };
  },
  methods: {
    sayHi: function () {
      console.log('hi!');
    }
  }
};
