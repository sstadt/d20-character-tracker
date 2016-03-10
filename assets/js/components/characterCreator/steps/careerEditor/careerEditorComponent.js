
var Vue = require('vue');
var careerEditorTemplate = require('./careerEditorTemplate.html');

module.exports = {
  template: careerEditorTemplate,
  props: {
    character: {
      type: Object,
      required: true,
      twoWay: true
    }
  }
};
