
define([
  'text!./modalTemplate.html'
], function (modalTemplate) {

  return {
    template: modalTemplate,
    props: {
      show: {
        type: Boolean,
        required: true,
        twoWay: true    
      }
    }
  };

});
