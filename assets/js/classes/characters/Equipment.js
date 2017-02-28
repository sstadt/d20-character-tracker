
var util = require('../../lib/util.js');

function Equipment() {
  this.id = util.guid();
  this.name = '';
  this.skill = '';
  this.encumbrance = 0;
  this.price = 0;
  this.damage = 0; // weapon only
  this.crit = 0; // weapon only
  this.range = ''; // weapon only
  this.defense = 0; // armor only
  this.soak = 0; // armor only
  this.hardPoints = 0; // weapon/armor only
}

module.exports = Equipment;
