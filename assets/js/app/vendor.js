
// list of vendor libraries
var vendor = {
  _: require('lodash'),
  q: require('q'),
  io: require('../config/io.js'),
  Vue: require('vue'),
  moment: require('moment')
};

// set all vendor includes to the global namespace
for (var lib in vendor) {
  window[lib] = vendor[lib];
}

Vue.filter('marked', require('marked'));

Vue.filter('chatTimestamp', function (value) {
  var date = moment(value);
  return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
});

// common Vue components
require('../components/common/common.js');
