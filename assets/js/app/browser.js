
Vue.config.debug = true;

require('../components/gameList/gameList.js');
require('../components/gameBrowser/gameBrowser.js');

new Vue({ el: '#game-browser' });
