/**
 * GameLog.js
 *
 * @description :: Holds the chat history for a game; stored separately to cut down on front loading of game data during game page rendering
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    game: {
      type: 'string',
      required: true
    },
    log: {
      type: 'array',
      defaultsTo: []
    }
  }
};
