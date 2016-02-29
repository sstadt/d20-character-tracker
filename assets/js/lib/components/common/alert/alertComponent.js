
define([
  'lodash',
  './alert.class',
  'text!./alertTemplate.html'
], function (_, Alert, alertTemplate) {

  return {
    template: alertTemplate,
    props: {
      alert: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    ready: function () {
      this.alert = new Alert();
    },
    methods: {
      close: function () {
        this.alert.clearMessages();
      }
    }
  };

});
