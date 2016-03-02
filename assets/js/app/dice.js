
var Vue = require('Vue');

require('../components/common/common.js');
require('../components/diceRoller/diceRoller.js');

Vue.config.debug = true;

new Vue({ el: '#diceRoller' });
