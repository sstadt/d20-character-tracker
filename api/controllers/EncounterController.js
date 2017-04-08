/**
 * EncounterController
 *
 * @description :: Server-side logic for managing encounters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  get: function (req, res) {
    var gameId = req.param('gameId');

    EncounterService.getDefault(gameId)
      .then(function success(encounter) {
        res.json(encounter);
      }, function error(reason) {
        res.jsonError(reason);
      });
  },

  addCombatant: function (req, res) {
    var gameId = req.param('gameId'),
      encounterId = req.param('encounterId'),
      combatant = req.param('combatant');

    EncounterService.addCombatant(gameId, encounterId, combatant)
      .then(function success() {
        res.send(200);
      }, function error(reason) {
        res.jsonError(reason);
      });
  },

  removeCombatant: function (req, res) {
    var gameId = req.param('gameId'),
      encounterId = req.param('encounterId'),
      combatantId = req.param('combatantId');

    EncounterService.removeCombatant(gameId, encounterId, combatantId)
      .then(function success() {
        res.send(200);
      }, function error(reason) {
        res.jsonError(reason);
      });
  },

  updateCombatant: function (req, res) {
    var gameId = req.param('gameId'),
      encounterId = req.param('encounterId'),
      combatant = req.param('combatant');

    EncounterService.updateCombatant(gameId, encounterId, combatant)
      .then(function success() {
        res.send(200);
      }, function error(reason) {
        res.jsonError(reason);
      });
  },

  clearEncounter: function (req, res) {
    var gameId = req.param('gameId'),
      encounterId = req.param('encounterId');

    EncounterService.clearEncounter(gameId, encounterId)
      .then(function success() {
        res.send(200);
      }, function error(reason) {
        res.jsonError(reason);
      });
  }

};
