define([
  'vue',
  'text!./careerEditorTemplate.html'
], function (Vue, careerEditorTemplate) {

  return {
    template: careerEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  };

});