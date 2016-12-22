
module.exports = {
  template: require('./signupTemplate.html'),
  data: function () {
    return {
      email: '',
      password: '',
      confirm: ''
    };
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    }
  }
};
