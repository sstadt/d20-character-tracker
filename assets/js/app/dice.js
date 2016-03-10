
var Vue = require('vue');

require('../components/common/common.js');
require('../components/diceRoller/diceRoller.js');

Vue.config.debug = true;

new Vue({ el: '#diceRoller' });
