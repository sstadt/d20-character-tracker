
var vInputTemplate = require('./vInputTemplate.html');
var constants = require('../../../config/constants.js');

var events = {};

events[constants.events.form.requestValidation] = function () {
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
    validate: _.debounce(function () {
      var label = this.label || this.name,
        errors = {};

      if (this.name) {
        errors[this.name] = [];

        // required validation
        if (this.required && this.value.length === 0) {
          errors[this.name].push(label + ' is required');
        }

        // html5 data type validation
        if (constants.validation.hasOwnProperty(this.type) && !constants.validation[this.type].regex.test(this.value)) {
          errors[this.name].push(constants.validation[this.type].defaultError);
        }

        // notify self and parent form that validation has occured
        this.hasError = errors[this.name].length > 0;
        if (this.hasError) {
          this.$dispatch(constants.events.form.inputError, errors);
        } else {
          this.$dispatch(constants.events.form.inputValid, this.name);
        }
      }
    }, 500)
  }
};
