
var Vue = require('vue');

Vue.config.debug = true;

require('../components/common/common.js');
require('../components/game/game.js');

new Vue({ el: '#game' });
