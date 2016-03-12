/**
 * Crawl.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      defaultsTo: ''
    },
    subtitle: {
      type: 'string',
      defaultsTo: ''
    },
    crawl: {
      type: 'string',
      required: true
    },
    imageUrl: {
      type: 'string',
      required: true
    },
    game: {
      model: 'game'
    }
  }
};
