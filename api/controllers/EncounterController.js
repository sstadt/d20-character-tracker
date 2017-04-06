/**
 * EncounterController
 *
 * @description :: Server-side logic for managing encounters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var encounterErrors = sails.config.notifications.Game.encounter.error;

module.exports = {

  get: function (req, res) {
    var encounterId = req.param('encounterId'),
      gameId = req.param('gameId'),
      name = req.param('name') || 'default'; // TODO: eventually this will be used for saved encounters

    Encounter.findOne({
      id: encounterId,
      game: gameId,
      name: name
    }, function (err, encounter) {
      if (err) {
        res.jsonError(encounterErrors.notFound);
      } else if (encounter) {
        res.json({ encounter: encounter });
      } else {
        Encounter.create({ name: 'default' }, function (err, newEncounter) {
          if (err) {
            res.jsonError(encounterErrors.cannotCreate);
          } else {
            res.json({ encounter: newEncounter });
          }
        });
      }
    });
  },

  update: function (req, res) {
    var encounter = req.param('encounter'),
      gameId = req.param('gameId'),
      encounterId = encounter.id;

    encounter.game = gameId;

    Encounter.update(encounterId, encounter, function (err, updatedEncounter) {
      if (err) {
        res.jsonError(encounterErrors.cannotUpdate);
      } else {
        Game.message(gameId, {
          type: 'encounterUpdated',
          data: { encounter: updatedEncounter }
        });

        res.send(200);
      }
    });
  },

  // TODO: this is disabled until saved encounters is implemented
  // destroy: function (req, res) {
  //   var encounterId = req.param('encounterId'),
  //     gameId = req.param('gameId');
  //
  //   Encounter.destroy(encounterId, function (err) {
  //     if (err) {
  //       res.jsonError(encounterErrors.cannotDelete);
  //     } else {
  //       Game.message(gameId, {
  //         type: 'encounterRemoved',
  //         data: { encounter: encounterId }
  //       });
  //
  //       res.send(200);
  //     }
  //   });
  // }

};
