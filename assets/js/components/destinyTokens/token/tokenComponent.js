
module.exports = {
  template: require('./tokenTemplate.html'),
  props: {
    totalTokens: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    spacing: {
      type: Number,
      required: true
    }
  },
  computed: {
    icon() {
      return (this.type === 'light') ? 'light-destiny-token' : 'dark-destiny-token';
    },
    left() {
      return -((this.totalTokens / 2) * this.spacing);
    },
    tokenTransform() {
      var offsetX = this.left + (this.spacing * this.index),
        offsetY = (this.index % 2 === 0) ? -3 : 3;

      return `translateX(${offsetX}px) translateY(${offsetY}px)`;
    }
  },
  methods: {
    dragStart(event) {
      event.dataTransfer.setData('text/plain', `${this.type}-token`);
    }
  }
};
