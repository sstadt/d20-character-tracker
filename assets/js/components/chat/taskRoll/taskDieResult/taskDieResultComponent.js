
module.exports = {
  template: require('./taskDieResultTemplate.html'),
  props: {
    type: {
      type: String,
      required: true
    },
    result: {
      type: Object,
      required: true
    }
  },
  computed: {
    dieIcon() {
      return `die-${this.type}`;
    },
    isCompact() {
      return this.type === 'ability' || this.type === 'difficulty';
    },
    hasTwoIcons() {
      var numIcons = 0;

      for (var result in this.result) {
        numIcons += this.result[result];
      }

      return numIcons == 2;
    }
  }
};
