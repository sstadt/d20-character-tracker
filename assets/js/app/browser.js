
var Vue = require('vue');

Vue.config.debug = true;

require('../components/common/common.js');
require('../components/gameList/gameList.js');
require('../components/gameBrowser/gameBrowser.js');

new Vue({ el: '#game-browser' });
