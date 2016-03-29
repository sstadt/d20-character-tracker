
var constants = require('../../../config/constants.js');

module.exports = {
  template: require('./vInputTemplate.html'),
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
      error: '',
      validated: false,
    };
  },
  methods: {
    isValid: function () {
      if (!this.validated) {
        this.validate();
      }

      return (this.error.length === 0);
    },
    debounceValidate: _.debounce(function () {
      this.validate();
    }, 500),
    validate: function () {
      var label = this.label || this.name;

      // required validation
      if (this.required && this.value.length === 0) {
        this.error = label + ' is required';

      // html5 data type validation
      } else if (constants.validation.hasOwnProperty(this.type) && !constants.validation[this.type].regex.test(this.value)) {
        this.error = constants.validation[this.type].defaultError;

      // input is valid
      } else {
        this.error = '';
      }

      this.validated = true;
    }
  }
};
