/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true
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
    crawls: {
      collection: 'crawl',
      via: 'game'
    }
  }

};
