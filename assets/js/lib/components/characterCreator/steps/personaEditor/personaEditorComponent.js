define([
  'vue',
  'marked',
  'text!./personaEditorTemplate.html'
], function (Vue, marked, personaEditorTemplate) {

  return {
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

});