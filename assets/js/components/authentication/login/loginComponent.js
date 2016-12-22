
module.exports = {
  template: require('./loginTemplate.html'),
  props: {
    view: {
      type: String,
      twoWay: true
    }
  },
  data: function () {
    return {
      greeting: 'login component',
    };
  },
  methods: {
    setView(view) {
      this.view = view;
      // this.$emit('AUTHENTICATION_TAB_CHANGE', view);
    }
  }
};
