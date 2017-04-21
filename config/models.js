
/**
 * Default model configuration
 * (sails.config.models)
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  game: {
    defaultConfig: {
      isPublic: false
    }
  },

  connection: 'mongodb',

  // http://sailsjs.org/#/documentation/concepts/ORM/model-settings.html
  migrate: 'alter'

};
