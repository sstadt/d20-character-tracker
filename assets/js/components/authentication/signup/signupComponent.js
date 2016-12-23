
var FieldSet = require('../../../classes/FieldSet.js');

var validation = {
  email: {
    required: true,
    pattern: 'email'
  },
  password: {
    required: true,
    minlength: 5
  },
  confirm: {
    required: true,
    matches: 'password'
  }
};

module.exports = {
  template: require('./signupTemplate.html'),
  data: function () {
    return {
      form: new FieldSet(validation),
      email: '',
      emailError: '',
      password: '',
      passwordError: '',
      confirm: '',
      confirmError: ''
    };
  },
  created() {
    var vm = this;
    vm.form.init(vm);
  },
  methods: {
    setView(view) {
      this.$emit('set-view', view);
    },
    signup() {

    }
  }
};
