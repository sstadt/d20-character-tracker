/**
 * gameMaster
 *
 * @module      :: Policy
 * @description :: Allows access to game admin functionality if the current user is the game master
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

var gameErrors = sails.config.notifications.Game.general.error;

module.exports = function (req, res, next) {
  var gameId = req.param('gameId');

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
          res.jsonError(gameErrors.editDenied);
        }
      }
    });
};
