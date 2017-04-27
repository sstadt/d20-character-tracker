
module.exports = {
  template: require('./cardStatTemplate.html'),
  props: {
    heading: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    total: {
      type: Number
    }
  },
  computed: {
    label() {
      return (_.isUndefined(this.total)) ? this.value : `${this.value}/${this.total}`;
    }
  }
};
