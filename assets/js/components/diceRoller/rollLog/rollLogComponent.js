
define([
  'vue',
  'moment',
  'text!./rollLogTemplate.html'
], function (Vue, moment, rollLogTemplate) {

  Vue.filter('rollTimestamp', function (value) {
    var date = moment(value);

    return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
  });

  return {
    template: rollLogTemplate,
    props: {
      rolls: {
        type: Array,
        required: true
      }
    }
  };

});
