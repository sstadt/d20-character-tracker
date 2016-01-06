define([
  'vue',
  'text!./attributesEditor.html'
], function (Vue, attributesEditorTemplate) {

  Vue.component('attributesEditor', {
    template: attributesEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  });

});