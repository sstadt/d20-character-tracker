
function DicePool(options) {
  this.description = options.description || 'rolls a dice pool';
  this.ability = options.ability || 0;
  this.proficiency = options.proficiency || 0;
  this.difficulty = options.difficulty || 0;
  this.challenge = options.challenge || 0;
  this.boost = options.boost || 0;
  this.setback = options.setback || 0;
  this.force = options.force || 0;
}

module.exports = DicePool;
