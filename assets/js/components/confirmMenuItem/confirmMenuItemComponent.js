
module.exports = {
  template: require('./confirmMenuItemTemplate.html'),
  props: {
    delay: {
      type: Number,
      default: 10000
    }
  },
  data() {
    return {
      confirmed: false
    };
  },
  methods: {
    confirm() {
      var self = this;

      self.confirmed = true;
      setTimeout(() => self.confirmed = false, this.delay);
    },
    submit() {
      this.$emit('submit');
    }
  }
};
