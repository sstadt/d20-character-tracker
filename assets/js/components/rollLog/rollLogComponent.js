
var rollLogTemplate = require('./rollLogTemplate.html');

Vue.filter('rollTimestamp', function (value) {
  var date = moment(value);

  return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
});

module.exports = {
  template: rollLogTemplate,
  props: {
    rolls: {
      type: Array,
      required: true
    }
  }
};
