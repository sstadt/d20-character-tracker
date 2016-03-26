
var constants = require('../../../config/constants.js');

var events = {};

events[constants.events.form.inputError] = function InputError(error) {
  for (var name in error) {
    this.errors[name] = error[name];
  }
  this.parseErrors();
};

events[constants.events.form.inputValid] = function InputValid(name) {
  if (this.errors.hasOwnProperty(name)) {
    delete this.errors[name];
  }
  this.parseErrors();
};

events[constants.events.form.answerValidationRequest] = _.debounce(function ValidationAnswered() {
  console.log('validation answered');
  console.log(this.isValid());
}, 300);

module.exports = {
  template: require('./vFormTemplate.html'),
  events: events,
  data: function () {
    return {
      formAlert: {},
      errors: {}
    };
  },
  methods: {
    isValid: function () {
      return _.keys(this.errors).length === 0;
    },
    validate: function (event) {
      event.preventDefault();
      console.log('broadcasting validation request');
      this.$broadcast(constants.events.form.requestValidation);
      // if (_.keys(this.errors).length > 0) {
      // }
    },
    parseErrors: function () {
      this.formAlert.clearMessages();
      for (var name in this.errors) {
        for (var i = 0, j = name.length; i < j; i++) {
          this.formAlert.error(this.errors[name][i]);
        }
      }
    }
  }
};
