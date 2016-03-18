
module.exports = {
  template: require('./modalTemplate.html'),
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
};
