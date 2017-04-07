
var util = require('../lib/util.js');

/**
 * EncounterToken Options Object
 *
 * name (string): the name of the entity
 * imageUrl (string): image to use for token avatar
 * currentWounds (integer): current wounds
 * currentStrain (integer) [optional]: current strain
 *
 * totalWounds and totalStrain are derived from the passed in NPC template
 */

function EncounterToken(npc, options = {}) {
  this.id = util.guid();
  this.name = npc.name;
  this.imageUrl = npc.imageUrl;
  this.woundThreshold = npc.woundThreshold;
  this.currentWounds = options.currentWounds || 0;

  if (npc.strainThreshold > 0) {
    this.strainThreshold = npc.strainThreshold;
    this.currentStrain = options.currentStrain || 0;
  }

  this.template = _.extend(npc);
}

module.exports = EncounterToken;
