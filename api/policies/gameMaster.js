/**
 * gameMaster
 *
 * @module      :: Policy
 * @description :: Allows access to game admin functionality if the current user is the game master
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function (req, res, next) {
  var gameId = req.param('gameId');

  Game.findOne(gameId)
    .populate('gameMaster')
    .exec(function (err, game) {
      if (err) {
        res.jsonError('Error retrieving game');
      } else if (!game) {
        res.json(ErrorService.generate('Game not found'));
      } else {
        if (game.gameMaster.id === req.session.User.id) {
          next();
        } else {
          res.json(ErrorService.generate('You do not have permission to edit this game'));
        }
      }
    });
};
