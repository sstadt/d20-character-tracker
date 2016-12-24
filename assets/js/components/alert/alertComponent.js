
module.exports = {
  template: require('./alertTemplate.html'),
  props: {
    canClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      messages: [],
      type: ''
    };
  },
  methods: {
    close() {
      this.messages = [];
      this.type = 'none';
    },
    addMessage(type, message) {
      if (this.type !== type) {
        this.type = type;
        this.messages = (_.isArray(message)) ? message : [message];
      } else {
        if (_.isArray(message)) {
          this.messages.concat(message);
        } else {
          this.messages.push(message);
        }
      }
    },
    message(message) {
      this.addMessage('', message);
    },
    success(message) {
      this.addMessage('success', message);
    },
    warning(message) {
      this.addMessage('warning', message);
    },
    alert(message) {
      this.addMessage('alert', message);
    }
  }
};
