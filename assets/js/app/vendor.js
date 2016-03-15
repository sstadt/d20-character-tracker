
// list of vendor libraries
var vendor = {
  _: require('lodash'),
  q: require('q'),
  io: require('../config/io.js'),
  Vue: require('vue'),
  moment: require('moment'),
  marked: require('marked')
};

// set all vendor includes to the global namespace
for (var lib in vendor) {
  window[lib] = vendor[lib];
}

// common Vue components
require('../components/common/common.js');
