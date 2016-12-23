
module.exports = {
  template: require('./<%- name %>Template.html'),
  data() {
    return {
      greeting: '<%- name %> component',
    };
  },
  methods: {
    sayHi() {
      console.log('hi!');
    }
  }
};
