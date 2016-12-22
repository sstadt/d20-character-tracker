
module.exports = {
  template: require('./passwordResetTemplate.html'),
  data: function () {
    return {
      email: ''
    };
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    }
  }
};
