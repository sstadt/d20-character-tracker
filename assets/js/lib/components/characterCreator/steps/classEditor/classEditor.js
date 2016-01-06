define([
  'vue',
  'text!./classEditor.html'
], function (Vue, classEditorTemplate) {

  Vue.component('classEditor', {
    template: classEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  });

});