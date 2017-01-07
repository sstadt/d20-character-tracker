
module.exports = {
  template: require('./dieControlTemplate.html'),
  props: {
    die: {
      type: String,
      required: true
    }
  },
  computed: {
    icon() {
      return `die-${this.die}`;
    }
  },
  methods: {
    dieClick() {
      this.$emit('die-click');
    },
    dragStart(event, type) {
      event.dataTransfer.setData("text/plain", this.die);
    }
  }
};
