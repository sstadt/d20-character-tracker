
module.exports = {
  template: require('./statInputTemplate.html'),
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    divider: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String
    }
  },
  data() {
    return {
      currentVal: this.value,
    };
  },
  watch: {
    currentVal() {
      this.$emit('input', this.currentVal);
    }
  }
};
