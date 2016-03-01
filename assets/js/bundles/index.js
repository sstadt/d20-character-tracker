
var Vue = require('Vue');
var includeMe = require('../browserify-test/includeMe.js');
var template = require('../browserify-test/template.html');

includeMe.sayHi();
console.log(template);

new Vue({
  el: '#test',
  template: template
});
