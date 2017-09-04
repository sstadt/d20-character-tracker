
var characterErrors = sails.config.notifications.Character.error;

module.exports = function (req, res, next) {
  var characterId = req.param('characterId');

  Character.findOne(characterId, function (err, character) {
    if (err) {
      res.jsonError(characterErrors.notFound);
    } else if (!character) {
      res.jsonError(characterErrors.notFound);
    } else {
      if (character.owner === req.session.User.id) {
        next();
      } else {
        res.jsonError(characterErrors.cannotUpdate);
      }
    }
  });
};
