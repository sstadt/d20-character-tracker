/**
 * DiceController
 *
 * @description :: Server-side logic for managing dice
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function (req, res) {
    res.view({
      title: 'Dice Roller',
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
    };

    Roll.create(TaskPoolService.roll(pool), function (err, roll) {
      if (err) {
        res.serverError(err);
      }

      res.json(TaskPoolService.roll(pool));      
    });

  }
};

