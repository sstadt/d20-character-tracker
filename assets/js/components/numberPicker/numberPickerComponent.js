
module.exports = {
  template: require('./numberPickerTemplate.html'),
  props: ['value', 'label', 'subtitle', 'icon'],
  data() {
    var val = parseInt(this.value, 10);

    return {
      innerValue: _.isNaN(val) ? 0 : val,
    };
  },
  created() {
    this.$emit('input', this.innerValue);
  },
  watch: {
    innerValue() {
      this.$emit('input', this.innerValue);
    }
  },
  methods: {
    increment() {
      this.innerValue++;
    },
    decrement() {
      if (this.innerValue > 0) this.innerValue--;
    }
  }
};
