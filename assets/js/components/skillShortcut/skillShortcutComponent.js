
module.exports = {
  template: require('./skillShortcutTemplate.html'),
  props: {
    name: {
      type: String,
      required: true
    },
    ability: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      ranks: this.value
    };
  },
  watch: {
    ranks() {
      this.$emit('input', this.ranks);
    }
  },
  methods: {
    increment() {
      if (this.ranks < this.max) this.ranks++;
    },
    decrement() {
      if (this.ranks > 0) this.ranks--;
    }
  }
};
