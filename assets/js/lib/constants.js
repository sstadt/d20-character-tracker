
/**
 * 
 * Constants
 * ----------------------------
 * 
 */

define(function () {
  'use strict';

  return {
    events: {
      prompt: {
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
      }
    }
  };
});
