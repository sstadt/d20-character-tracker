
var q = require('q');
var encounterErrors = sails.config.notifications.Game.encounter.error;

module.exports = {
  getDefault: function (gameId) {
    var deferred = q.defer();

    Encounter.findOne({
      game: gameId,
      name: 'swgt-default'
    }, function (err, encounter) {
      if (err) {
        deferred.reject(encounterErrors.notFound);
      } else if (encounter) {
        deferred.resolve(encounter);
      } else {
        Encounter.create({ game: gameId, name: 'swgt-default' }, function (err, newEncounter) {
          if (err) {
            deferred.reject(encounterErrors.cannotCreate);
          } else {
            deferred.resolve(newEncounter);
          }
        });
      }
    });

    return deferred.promise;
  },

  addCombatant: function (gameId, encounterId, combatant) {
    var deferred = q.defer();

    Encounter.findOne({ id: encounterId, game: gameId }, function (err, encounter) {
      if (err) {
        deferred.reject(encounterErrors.notFound);
      } else if (!encounter) {
        deferred.reject(encounterErrors.notFound);
      } else {
        encounter.npcs.push(combatant);
        encounter.save(function (err) {
          if (err) {
            deferred.reject(encounterErrors.cannotUpdate);
          } else {
            Game.message(gameId, {
              type: 'combatantAdded',
              data: {
                encounterId: encounterId,
                combatant: combatant
              }
            });

            deferred.resolve();
          }
        });
      }
    });

    return deferred.promise;
  },

  removeCombatant: function (gameId, encounterId, combatantId) {
    var deferred = q.defer(),
      combatantIndex = -1;

    Encounter.findOne({ id: encounterId, game: gameId }, function (err, encounter) {
      if (err) {
        deferred.reject(encounterErrors.notFound);
      } else if (!encounter) {
        deferred.reject(encounterErrors.notFound);
      } else {
        combatantIndex = _.findIndex(function (entity) {
          return entity.id === combatantId;
        });
        if (combatantIndex > -1) encounter.npcs.splice(combatantIndex, 1);
        encounter.save(function (err) {
          if (err) {
            deferred.reject(encounterErrors.cannotUpdate);
          } else {
            Game.message(gameId, {
              type: 'combatantRemoved',
              data: {
                encounterId: encounterId,
                combatantId: combatantId
              }
            });

            deferred.resolve();
          }
        });
      }
    });

    return deferred.promise;
  },

  updateCombatant: function (gameId, encounterId, combatant) {
    var deferred = q.defer(),
      combatantIndex = -1;

    Encounter.findOne({ id: encounterId, game: gameId }, function (err, encounter) {
      if (err) {
        deferred.reject(encounterErrors.notFound);
      } else if (!encounter) {
        deferred.reject(encounterErrors.notFound);
      } else {
        combatantIndex = _.findIndex(function (entity) {
          return combatant && entity.id === combatant.id;
        });
        if (combatantIndex > -1) encounter.npcs[combatantIndex] = combatant;
        encounter.save(function (err) {
          if (err) {
            deferred.reject(encounterErrors.cannotUpdate);
          } else {
            Game.message(gameId, {
              type: 'combatantUpdated',
              data: {
                encounterId: encounterId,
                combatant: combatant
              }
            });

            deferred.resolve();
          }
        });
      }
    });

    return deferred.promise;
  },

  clearEncounter: function (gameId, encounterId) {
    var deferred = q.defer();

    Encounter.findOne({ id: encounterId, game: gameId }, function (err, encounter) {
      if (err) {
        deferred.reject(encounterErrors.notFound);
      } else if (!encounter) {
        deferred.reject(encounterErrors.notFound);
      } else {
        encounter.npcs = [];
        encounter.save(function (err) {
          if (err) {
            deferred.reject(encounterErrors.cannotUpdate);
          } else {
            Game.message(gameId, {
              type: 'clearEncounter',
              data: { encounterId: encounterId }
            });

            deferred.resolve();
          }
        });
      }
    });

    return deferred.promise;
  }

};
