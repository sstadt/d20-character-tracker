

module.exports = function (req, res, next) {
  var crawl = req.param('crawl');

  Game.findOne({ id: crawl.game }, function (err, game) {
    if (!game || !game.gameMaster || game.length < 1) {
      res.json(ErrorService.generate('Game not found'));
    } else if (game.gameMaster === req.session.User.id) {
      next();
    } else {
      res.json(ErrorService.generate('You do not have permission to edit this crawl.'));
    }
  });
};
