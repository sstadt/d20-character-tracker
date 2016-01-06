define([
  'vue',
  'text!./personaEditor.html'
], function (Vue, personaEditorTemplate) {

  Vue.component('personaEditor', {
    template: personaEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  });

});