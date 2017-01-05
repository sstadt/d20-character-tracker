/**
 * Crawl.js
 *
 * @description :: Intro crawl data, used for creating star wars crawls to introduce or recap game sessions
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
      required: true,
      url: true
    },
    game: {
      model: 'game'
    }
  }
};
