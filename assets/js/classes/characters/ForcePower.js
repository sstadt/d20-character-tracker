
var util = require('../../lib/util.js');

function Upgrade() {
  this.id = util.guid();
  this.effect = '';
  this.xpCost = 0;
  this.description = '';
}

function ForcePower() {
  this.id = util.guid();
  this.name = 'New Force Power';
  this.xpCost = 0;
  this.description = '';
  this.upgrades = [];
}

ForcePower.prototype.addUpgrade = function () {
  this.upgrades.push(new Upgrade());
};

module.exports = ForcePower;
