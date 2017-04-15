
// pass user - switch to character eventually - or combatant for npc
function MapToken(options) {
  this.type = options.type;
  this.id = options.id;
  this.x = options.x;
  this.y = options.y;
  this.image = options.image;
}

module.exports = MapToken;
