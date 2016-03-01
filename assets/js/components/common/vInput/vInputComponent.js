
var vInputTemplate = require('./vInputTemplate.html');

module.exports = {
  template: vInputTemplate,
  props: {
    type: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    value: {
      required: true,
      twoWay: true
    }
  }
};
