
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
  var self = this;

  Vue.nextTick(function () {
    self.$els.form.submit();
  });
}, 300);

module.exports = {
  template: require('./vFormTemplate.html'),
  events: events,
  props: {
    method: {
      type: String,
      defaultsTo: 'POST'
    },
    action: {
      type: String,
      defaultsTo: ''
    }
  },
  data: function () {
    return {
      formAlert: {},
      errors: {},
      validated: false
    };
  },
  methods: {
    isValid: function () {
      return _.keys(this.errors).length === 0;
    },
    validate: function (event) {
      if (!this.validated || !this.isValid()) {
        event.preventDefault();
      }

      if (!this.validated) {
        this.$broadcast(constants.events.form.requestValidation);
      }
    },
    parseErrors: function () {
      this.validated = true;
      this.formAlert.clearMessages();
      for (var name in this.errors) {
        for (var i = 0, j = name.length; i < j; i++) {
          this.formAlert.error(this.errors[name][i]);
        }
      }
    }
  }
};
