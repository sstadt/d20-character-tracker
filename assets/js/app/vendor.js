
// list of vendor libraries
var vendor = {
  _: require('lodash'),
  q: require('q'),
  Vue: require('vue'),
  moment: require('moment'),
  marked: require('marked'),
  io: require('../lib/io.js'),
  Dropzone: require('dropzone')
};

// set all vendor includes to the global namespace
for (var lib in vendor) {
  window[lib] = vendor[lib];
}

Dropzone.autoDiscover = false;

/**
 * Vue Filters
 */

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
  primary: {
    color: 'indigo',
    hue: 900
  },
  accent: 'deep-orange',
  warn: 'red'
});

Vue.material.registerTheme('starwars', {
  primary: 'light-blue',
  accent: 'yellow'
});

Vue.material.registerTheme('tabs', {
  primary: 'white',
  accent: 'deep-orange',
  warn: 'red'
});
