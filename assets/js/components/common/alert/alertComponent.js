
var _ = require('lodash');
var Alert = require('./alert.class.js');
var alertTemplate = require('./alertTemplate.html');

module.exports = {
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
