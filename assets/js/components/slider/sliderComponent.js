
var util = require('../../lib/util.js');

module.exports = {
  template: require('./sliderTemplate.html'),
  data() {
    return {
      position: 50
    };
  },
  methods: {
    clickHandler(event) {
      var newPosition = Math.round((event.offsetX / this.$el.offsetWidth) * 100);

      console.log(newPosition);

      this.position = newPosition;
    }
  }
};
