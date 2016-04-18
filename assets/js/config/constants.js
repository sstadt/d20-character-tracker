
/**
 *
 * Constants
 * ----------------------------
 *
 */

module.exports = {

  /*
   * Events
   * ----------------------------
   */
  events: {
    prompt: {
      promptUser: 'VE_PROMPT_PROMPT_USER',
      valueSubmitted: 'VE_PROMPT_VALUE_SUBMITTED'
    },
    characterCreator: {
      changeTab: 'VE_CHARACTER_CREATOR_CHANGE_TAB',
      newCharacter: 'VE_CHARACTER_CREATOR_NEW_CHARACTER',
      addCharacter: 'VE_CHARACTER_CREATOR_ADD_CHARACTER'
    },
    diceRoller: {
      newLocalRoll: 'VE_DICE_ROLLER_NEW_LOCAL_ROLL',
      joinedChannel: 'VE_DICE_ROLLER_JOINED_CHANNEL'
    },
    gameBrowser: {
      error: 'VE_GAME_BROWSER_ERROR'
    },
    game: {
      closeCrawl: 'VE_GAME_CLOSE_CRAWL_MODAL',
      closePlayers: 'VE_GAME_CLOSE_PLAYERS_MODAL',
      closeSettings: 'VE_GAME_CLOSE_SETTINGS_MODAL',
      crawlMusicEnded: 'VE_GAME_CRAWL_MUSIC_ENDED'
    }
  },

  /*
   * Endpoints
   * ----------------------------
   */
  endpoints: {
    dice: {
      roll: '/roll'
    },
    channel: {
      join: '/channel/join',
      leave: '/channel/leave'
    },
    user: {
      getSelf: '/self',
      setHandle: '/user/setHandle'
    },
    game: {
      get: '/game/get',
      getLog: '/game/getLog',
      search: '/game/search',
      playing: '/game/playing',
      create: '/game/create',
      updateConfig: '/game/updateConfig',
      addCrawl: '/game/addCrawl',
      updateCrawl: '/crawl/update',
      removeCrawl: '/crawl/destroy',
      join: '/game/join',
      approvePlayer: '/game/approvePlayer',
      declinePlayer: '/game/declinePlayer',
      removePlayer: '/game/removePlayer',
      sendMessage: '/game/sendMessage',
      sendRoll: '/game/sendRoll'
    }
  },

  /*
   * Validation Rules
   * ----------------------------
   */
  validation: {
    email: {
      regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      defaultError: 'Please enter a valid email address'
    },
    url: {
      regex: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      defaultError: 'Please enter a valid URL'
    },
    number: {
      regex: /[-.0-9]+/,
      defaultError: 'Please enter a valid number'
    }
  }

};
