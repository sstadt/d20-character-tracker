
var Vue = require('Vue');
var includeMe = require('../browserify-test/includeMe.js');
var template = require('../browserify-test/template.html');
var constants = require('../config/constants.js');

require('../components/common/common.js');

new Vue({
  el: '#test',
  template: template
});
