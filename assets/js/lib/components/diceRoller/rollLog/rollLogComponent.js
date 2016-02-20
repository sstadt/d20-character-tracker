
define([
  'text!./rollLogTemplate.html'
], function (rollLogTemplate) {

  return {
    template: rollLogTemplate,
    props: {
      rolls: {
        type: Array,
        required: true
      }
    }
  };

});
