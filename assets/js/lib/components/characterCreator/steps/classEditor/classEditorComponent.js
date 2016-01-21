define([
  'vue',
  'text!./classEditorTemplate.html'
], function (Vue, classEditorTemplate) {

  return {
    template: classEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  };

});