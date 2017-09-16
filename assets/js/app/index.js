
// themes
require('../themes/default.js');
require('../themes/starwars.js');

// filters
require('../filters/chatTimestamp.js');
require('../filters/statAbbr.js');
require('../filters/skillAbbr.js');

// directives
require('../directives/focus.js');

// general components
require('../components/alert/alert.js');
require('../components/notification/notification.js');
require('../components/toolbar/toolbar.js');
require('../components/icon/icon.js');
require('../components/authentication/authentication.js');
require('../components/jukebox/jukebox.js');
require('../components/numberPicker/numberPicker.js');
require('../components/confirmButton/confirmButton.js');
require('../components/confirmMenuItem/confirmMenuItem.js');
require('../components/radialMenu/radialMenu.js');
require('../components/radialMenuItem/radialMenuItem.js');
require('../components/draggablePanel/draggablePanel.js');
require('../components/imageFinder/imageFinder.js');

// user components
require('../components/userProfile/userProfile.js');

// game components
require('../components/starWarsCrawl/starWarsCrawl.js');
require('../components/gameList/gameList.js');
require('../components/gameBrowser/gameBrowser.js');
require('../components/game/game.js');
require('../components/mapViewer/mapViewer.js');
require('../components/party/party.js');
require('../components/chat/chat.js');
require('../components/dicePool/dicePool.js');
require('../components/diceControls/diceControls.js');
require('../components/destinyTokens/destinyTokens.js');

// character/NPC components
require('../components/encounter/encounter.js');
require('../components/cardAbility/cardAbility.js');
require('../components/cardPower/cardPower.js');
require('../components/cardStat/cardStat.js');
require('../components/cardTabs/cardTabs.js');
require('../components/cardTab/cardTab.js');
require('../components/combatAvatar/combatAvatar.js');
require('../components/combatantCard/combatantCard.js');
require('../components/skillShortcut/skillShortcut.js');
require('../components/characterList/characterList.js');
require('../components/characterCard/characterCard.js');

new Vue({
  el: '#app',
  methods: {
    openDialog(name) {
      this.$refs[name].open();
    },
    closeDialog(name) {
      this.$refs[name].close();
    }
  }
});
