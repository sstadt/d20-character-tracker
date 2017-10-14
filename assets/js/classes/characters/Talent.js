
var util = require('../../lib/util.js');

function Talent() {
  this.id = util.guid();
  this.name = 'New Ability';
  this.xpCost = 0;
  this.description = '';
}

module.exports = Talent;
