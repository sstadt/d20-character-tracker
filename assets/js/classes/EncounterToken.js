
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

function EncounterToken(options, npc) {
  this.name = options.name;
  this.imageUrl = options.imageurl;
  this.woundThreshold = npc.woundThreshold;
  this.currentWounds = options.currentWounds || 0;

  if (npc.strainThreshold > 0) {
    this.strainThreshold = npc.strainThreshold;
    this.currentStrain = options.currentStrain || 0;
  }

  this.template = _.extend(npc);
}

module.exports = EncounterToken;
