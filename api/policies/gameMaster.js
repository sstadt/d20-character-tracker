
module.exports = function (req, res, next) {
  var gameId = req.param('gameId');

  Game.findOne(gameId)
    .populate('gameMaster')
    .exec(function (err, game) {
      if (err) {
        res.jsonError('Error retriving game');
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
