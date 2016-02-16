
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
        type: String,
        required: true,
        twoWay: true
      }
    }
  };

});
