
/**
 *
 * Constants
 * ----------------------------
 *
 */

module.exports = {
  events: {
    form: {
      inputError: 'VE_FORM_INPUT_ERROR',
      inputValid: 'VE_FORM_INPUT_VALID',
      requestValidation: 'VE_FORM_REQUEST_VALIDATION',
      answerValidationRequest: 'VE_FORM_ANSWER_VALIDATION_REQUEST'
    },
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
    game: {
      closeCrawl: 'VE_GAME_CLOSE_CRAWL_MODAL',
      closePlayers: 'VE_GAME_CLOSE_PLAYERS_MODAL',
      closeSettings: 'VE_GAME_CLOSE_SETTINGS_MODAL'
    }
  },
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
      search: '/game/search',
      ownedIndex: '/game/owned',
      create: '/game/create',
      updateConfig: '/game/updateConfig',
      addCrawl: '/game/addCrawl',
      updateCrawl: '/crawl/update',
      removeCrawl: '/crawl/destroy',
      join: '/game/join'
    }
  },
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
