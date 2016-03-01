
var modalTemplate = require('./modalTemplate.html');

module.exports = {
  template: modalTemplate,
  props: {
    show: {
      type: Boolean,
      required: true,
      twoWay: true
    }
  }
};
