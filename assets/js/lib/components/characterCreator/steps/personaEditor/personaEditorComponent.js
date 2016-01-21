define([
  'vue',
  'text!./personaEditorTemplate.html'
], function (Vue, personaEditorTemplate) {

  return {
    template: personaEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  };

});