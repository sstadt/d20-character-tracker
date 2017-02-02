/**
 * Game.js
 *
 * @description :: Holds basic game data inclusing title, players, crawls, and config; chat log is stored in GameLog
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
    },
    online: {
      type: 'array',
      defaultsTo: []
    },
    lightTokens: {
      type: 'integer',
      defaultsTo: 0
    },
    darkTokens: {
      type: 'integer',
      defaultsTo: 0
    },
    gameMaster: {
      model: 'user',
      required: true
    },
    players: {
      collection: 'user',
      via: 'player',
      dominant: true
    },
    invitedPlayers: {
      collection: 'user',
      via: 'invitedGames',
      dominant: true
    },
    requestingPlayers: {
      collection: 'user',
      via: 'requestedGames',
      dominant: true
    },
    crawls: {
      collection: 'crawl',
      via: 'gameId'
    },
    config: {
      type: 'json',
      defaultsTo: _.extend(sails.config.models.game.defaultconfig)
    }
  }

};
