
var marked = require('marked');
var personaEditorTemplate = require('./personaEditorTemplate.html');

module.exports = {
  template: personaEditorTemplate,
  props: {
    character: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  filters: {
    marked: marked
  }
};
