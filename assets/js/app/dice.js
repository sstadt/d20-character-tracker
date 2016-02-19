
require([
  'constants',
  'vue',
  'component/common/common',
  'component/diceRoller/diceRoller',
  'sails'
], function (constants, Vue) {
  'use strict';

  Vue.config.debug = true;

  new Vue({ el: '#diceRoller' });

});