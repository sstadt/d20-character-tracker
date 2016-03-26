
var vInputTemplate = require('./vInputTemplate.html');
var constants = require('../../../config/constants.js');

var events = {};

events[constants.events.form.requestValidation] = function () {
  console.log('validation request received');
  this.validate();
  this.$dispatch(constants.events.form.answerValidationRequest);
};

module.exports = {
  template: vInputTemplate,
  events: events,
  props: {
    label: {
      type: String
    },
    name: {
      type: String
    },
    type: {
      type: String,
      required: true
    },
    placeholder: {
      type: String
    },
    icon: {
      type: String
    },
    value: {
      required: true,
      twoWay: true
    },
    required: {
      type: Boolean,
      defaultTo: false
    }
  },
  data: function () {
    return {
      hasError: false
    };
  },
  methods: {
    validate: function () {
      var self = this,
        label = self.label || self.name,
        errors = {};

      if (self.name) {
        errors[self.name] = [];

        if (this.required && this.value.length === 0) {
          errors[self.name].push(label + ' is required');
        }

        if (errors[self.name].length > 0) {
          this.$dispatch(constants.events.form.inputError, errors);
        }

        self.hasError = errors.hasOwnProperty(self.name);
      }
    },
    softValidate: _.debounce(function () {
      var self = this;

      if (self.name) {
        if (this.required && this.value.length > 0) {
          this.hasError = false;
          this.$dispatch(constants.events.form.inputValid, self.name);
        }
      }
    }, 300)
  }
};
