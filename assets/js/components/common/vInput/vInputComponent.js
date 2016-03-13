
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
    placeholder: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      required: true,
      twoWay: true
    }
  }
};
