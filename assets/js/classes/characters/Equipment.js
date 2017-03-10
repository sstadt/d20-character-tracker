
var util = require('../../lib/util.js');

function Equipment(options = {}) {
  this.id = util.guid();
  this.type = options.type || 'gear';
  this.name = '';
  this.encumbrance = 0;
  this.price = 0;

  switch (options.type) {
    case 'weapon':
      this.skill = '';
      this.damage = 0;
      this.crit = 0;
      this.range = '';
      this.hardPoints = 0;
      break;

    case 'armor':
      this.defense = 0;
      this.soak = 0;
      this.hardPoints = 0;
      break;
  }

}

module.exports = Equipment;
