
define([
  'lodash',
  'text!./alertTemplate.html'
], function (_, alertTemplate) {

  return {
    template: alertTemplate,
    props: {
      messages: {
        type: Array,
        required: true,
        twoWay: true
      },
      type: {
        type: String,
        required: true,
        twoWay: true
      }
    },
    methods: {
      close: function () {
        this.messages = [];
      }
    }
  };

});
