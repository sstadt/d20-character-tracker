define([
  'vue',
  'text!./rollMethodBestOfFourTemplate.html'
], function (Vue, rollMethodBestOfFourTemplate) {

  return {
    template: rollMethodBestOfFourTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    }
  };

});