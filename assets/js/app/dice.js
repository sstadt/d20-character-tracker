
require([
  'constants',
  'vue',
  'component/common/common',
  'component/diceRoller/diceRoller',
  'component/rollChannel/rollChannel',
  'sails'
], function (constants, Vue) {
  'use strict';

  Vue.config.debug = true;

  new Vue({ el: '#diceRoller' });

});