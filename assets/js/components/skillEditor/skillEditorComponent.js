
module.exports = {
  template: require('./skillEditorTemplate.html'),
  props: {
    skill: {
      type: Object,
      required: true
    }
  },
  methods: {
    increment(name) {
      this.$emit('increment', name);
    },
    decrement(name) {
      this.$emit('decrement', name);
    }
  }
};
