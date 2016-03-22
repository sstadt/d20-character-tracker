/**
 * RollController
 *
 * @description :: Server-side logic for managing Rolls
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  index: function (req, res) {
    res.view({
      chatHandle: req.session.User.config.chatHandle || '',
      title: sails.config.globals.pageTitle.diceRoller,
      script: 'dice'
    });
  },
  roll: function (req, res) {
    var pool = {
      ability: req.param('ability') || 0,
      proficiency: req.param('proficiency') || 0,
      difficulty: req.param('difficulty') || 0,
      challenge: req.param('challenge') || 0,
      boost: req.param('boost') || 0,
      setback: req.param('setback') || 0,
      force: req.param('force') || 0
    },
    roll = DicePoolService.roll(req.param('description'), pool),
    channel = req.param('channel');

    if (channel) {
      roll.channel = channel;
      roll.username = req.session.User.chatHandle || 'Unknown';

      Roll.create(roll, function (err, roll) {
        if (err) {
          res.serverError(err);
        }

        Channel.publishUpdate(channel, { newRoll: roll });
        res.json(roll);
      });
    } else {
      res.json(roll);
    }

  }
};
