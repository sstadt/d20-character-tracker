
define([
  'text!./vInputTemplate.html'
], function (vInputTemplate) {

  return {
    template: vInputTemplate,
    props: {
      type: {
        type: String,
        required: true
      },
      label: {
        type: String
      },
      value: {
        required: true,
        twoWay: true
      }
    }
  };

});
