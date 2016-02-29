
define([
  'lodash',
  'text!./alertTemplate.html'
], function (_, alertTemplate) {

  function Alert() {
    this.messages = [];
    this.type = '';
  }

  Alert.prototype.clearMessages = function () {
    this.messages = [];
  };

  Alert.prototype.setType = function (type) {
    if (this.type !== type) {
      this.messages = [];
    }
    this.type = type;
  };

  Alert.prototype.addMessage = function (message, fade) {
    var self = this;

    self.messages.push(message);

    if (fade) {
      setTimeout(function () {
        self.messages.splice(_.findIndex(this.messages, function (existingMessage) {
          return existingMessage === message;
        }), 1);
      }, 10000);
    }
  };

  Alert.prototype.message = function (message, fade) {
    this.setType('');
    this.addMessage(message, fade);
  };

  Alert.prototype.info = function (message, fade) {
    this.setType('info');
    this.addMessage(message, fade);
  };

  Alert.prototype.success = function (message, fade) {
    this.setType('success');
    this.addMessage(message, fade);
  };

  Alert.prototype.warning = function (message, fade) {
    this.setType('warning');
    this.addMessage(message, fade);
  };

  Alert.prototype.error = function (message, fade) {
    this.setType('alert');
    this.addMessage(message, fade);
  };

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
