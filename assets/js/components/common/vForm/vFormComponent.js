
var constants = require('../../../config/constants.js');

module.exports = {
  template: require('./vFormTemplate.html'),
  props: {
    method: {
      type: String,
      defaultsTo: 'POST'
    },
    action: {
      type: String,
      defaultsTo: ''
    },
    ajax: {
      type: Boolean,
      defaultsTo: false
    }
  },
  methods: {
    submitForm: function (event) {
      if (this.ajax || !this.isValid()) {
        event.preventDefault();
      }
    },
    isValid: function () {
      var self = this,
        formIsValid = true;

      _.forEach(self.$children, function (child) {
        if (_.isFunction(child.isValid)) { // has input validation attached
          formIsValid = formIsValid && child.isValid();
        }
      });

      return formIsValid;
    }
  }
};
