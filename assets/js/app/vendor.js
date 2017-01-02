
// list of vendor libraries
var vendor = {
  _: require('lodash'),
  q: require('q'),
  Vue: require('vue'),
  moment: require('moment'),
  marked: require('marked'),
  io: require('../lib/io.js')
};

// set all vendor includes to the global namespace
for (var lib in vendor) {
  window[lib] = vendor[lib];
}

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
