/**
 * gameMaster
 *
 * @module      :: Policy
 * @description :: Allows access to game admin functionality if the current user is the game master
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var gameErrors = sails.config.notifications.Game.general.error;
  mapErrors = sails.config.notifications.Game.map.error;

module.exports = function (req, res, next) {
  var gameId = req.param('gameId'),
    tokenId = req.param('tokenId');

  if (tokenId === req.session.User.id) {
    next();
  } else {
    Game.findOne(gameId)
      .populate('gameMaster')
      .exec(function (err, game) {
        if (err) {
          res.jsonError(gameErrors.errorFindingGame);
        } else if (!game) {
          res.jsonError(gameErrors.gameNotFound);
        } else {
          if (game.gameMaster.id === req.session.User.id) {
            next();
          } else {
            res.jsonError(mapErrors.cannotMoveToken);
          }
        }
      });
  }
};
