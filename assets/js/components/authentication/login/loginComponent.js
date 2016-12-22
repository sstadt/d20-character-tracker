
module.exports = {
  template: require('./loginTemplate.html'),
  data: function () {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    }
  }
};
