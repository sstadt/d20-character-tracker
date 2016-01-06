define([
  'vue',
  'text!./rollMethodBasic.html'
], function (Vue, rollMethodBasicTemplate) {

  return {
    template: rollMethodBasicTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  };

});