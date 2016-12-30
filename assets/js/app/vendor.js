
// list of vendor libraries
var vendor = {
  _: require('lodash'),
  q: require('q'),
  Vue: require('vue'),
  moment: require('moment'),
  io: require('../lib/io.js')
};

// set all vendor includes to the global namespace
for (var lib in vendor) {
  window[lib] = vendor[lib];
}

/**
 * Filters
 */

Vue.filter('marked', require('marked'));

Vue.filter('chatTimestamp', function (value) {
  var date = moment(value);
  return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
});

/**
 * Vue Material Components
 */

var VueMaterial = require('vue-material');

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'blue-grey',
  warn: 'red'
});
