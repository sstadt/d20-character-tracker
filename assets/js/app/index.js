/*jslint browser: true*/

require([
  'vue',
  'component/characterList/characterList',
  'lib/global',
], function (Vue) {
  'use strict';

  new Vue({
    el: '#app',
    data: {
      hello: 'I\'m a character list!'
    }
  });

});