
module.exports = {
  template: require('./contentEditableTemplate.html'),
  props: ['value'],
  data() {
    return {
      innerText: this.value
    };
  },
  methods: {
    changeText() {
      this.innerText = this.$el.innerHTML;
      this.$emit('input', this.innerText);
    }
  }
};
