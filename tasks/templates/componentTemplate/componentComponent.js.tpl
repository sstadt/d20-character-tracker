
var <%- name %>Template = require('./<%- name %>Template.html');

module.exports = {
  template: <%- name %>Template,
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
