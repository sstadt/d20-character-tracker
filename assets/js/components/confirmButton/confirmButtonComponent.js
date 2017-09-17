
module.exports = {
  template: require('./confirmButtonTemplate.html'),
  props: {
    delay: {
      type: Number,
      default: 10000
    },
    disabled: {
      type: Boolean,
      default: false
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
