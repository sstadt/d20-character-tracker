
module.exports = {
  template: require('./cardTabTemplate.html'),
  props: {
    name: {
      type: String,
      required: true
    },
    selected: {
      default: false
    }
  },
  data() {
    return {
      active: false
    };
  },
  mounted() {
    this.active = this.selected;
    this.$parent.addTab(this);
  }
};
