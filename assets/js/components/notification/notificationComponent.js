
var defaultTimeout = 6;

module.exports = {
  template: require('./notificationTemplate.html'),
  data() {
    return {
      messages: []
    };
  },
  methods: {
    close() {
      this.messages = [];
    },
    addMessage(type, message, timeout) {
      var self = this;

      self.messages.push({ type, message, index: self.messages.length });

      setTimeout(() => self.messages.shift(), timeout * 1000);
    },
    message(message, timeout = defaultTimeout) {
      this.addMessage('', message, timeout);
    },
    success(message, timeout = defaultTimeout) {
      this.addMessage('success', message, timeout);
    },
    warning(message, timeout = defaultTimeout) {
      this.addMessage('warning', message, timeout);
    },
    alert(message, timeout = defaultTimeout) {
      this.addMessage('alert', message, timeout);
    }
  }
};
