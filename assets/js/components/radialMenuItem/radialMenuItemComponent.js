
var mathUtil = require('../../lib/util.math.js');

module.exports = {
  template: require('./radialMenuItemTemplate.html'),
  props: {
    radius: {
      type: Number,
      required: true
    },
    position: {
      type: Number,
      required: true
    }
  },
  computed: {
    degrees() {
      return Math.max(0, Math.min(360, Math.round(this.position)));
    },
    marginTop() {
      var top = -(this.radius * Math.cos(mathUtil.degreesToRadians(this.degrees)));
      return `${top}px`;
    },
    marginLeft() {
      var left = this.radius * Math.sin(mathUtil.degreesToRadians(this.degrees));
      return `${left}px`;
    }
  },
  methods: {
    select() {
      this.$emit('selected');
    }
  }
};
