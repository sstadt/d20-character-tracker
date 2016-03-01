
var constants = require('../../../config/constants.js');
var promptTemplate = require('./promptTemplate.html');
var events = {};

events[constants.events.prompt.promptUser] = function PromptUser(name) {
  if (name === this.name) {
    this.show = true;
  } else {
    // if we're not catching this event, allow the next prompt to try
    return true;
  }
};

module.exports = {
  template: promptTemplate,
  events: events,
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      promptValue: '',
      show: false
    };
  },
  watch: {
    show: function (val) {
      if (val === true && this.$children.length > 0) {
        this.$children[0].$els.input.focus();
      }
    }
  },
  methods: {
    submit: function () {
      var self = this;

      if (self.promptValue !== '') {
        self.$dispatch(constants.events.prompt.valueSubmitted, { name: self.name, value: self.promptValue });
        self.show = false;
        setTimeout(function () {
          self.promptValue = '';
        },  300);
      }
    },
    cancel: function () {
      this.show = false;
    }
  }
};
