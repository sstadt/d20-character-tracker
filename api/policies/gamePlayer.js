/**
 * gamePlayer
 *
 * @module      :: Policy
 * @description :: Allows access to game functionality if the current user is the game master or a player
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var gameErrors = sails.config.notifications.Game.general.error;

module.exports = function (req, res, next) {
  var gameId = req.param('gameId');

  Game.findOne(gameId)
    .populate('gameMaster')
    .populate('players')
    .exec(function (err, game) {
      if (err) {
        res.jsonError(gameErrors.errorFindingGame);
      } else if (!game) {
        res.jsonError(gameErrors.gameNotFound);
      } else {
        var playerIndex = _.findIndex(game.players, function (player) {
          return player.id === req.session.User.id;
        });

        if (game.gameMaster.id === req.session.User.id || playerIndex > -1) {
          next();
        } else {
          res.jsonError(gameErrors.accessDenied);
        }
      }
    });
};
