/**
 * Utility service for Game model
 */

var q = require('q');

module.exports = {
  validateConfig: function (game) {
    var defaultConfig = _.extend(sails.config.models.game.defaultConfig),
      deferred = q.defer(),
      settingUpdated = false;

    if (!game.config) {
      settingUpdated = true;
      game.config = {};
    }

    for (var setting in defaultConfig) {
      if (!game.config.hasOwnProperty(setting)) {
        settingUpdated = true;
        game.config[setting] = defaultConfig[setting];
      }
    }

    if (settingUpdated) {
      Game.update(game.id, game, function (err) {
        if (err) {
          deferred.reject(err);
        } else {
          deferred.resolve();
        }
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }
};
