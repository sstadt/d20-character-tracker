

function Upgrade() {
  this.effect = '';
  this.xpCost = 0;
  this.description = '';
}

function ForcePower() {
  this.name = '';
  this.xpCost = 0;
  this.description = '';
  this.upgrades = [];
}

ForcePower.prototype.addUpgrade = function () {
  this.upgrades.push(new Upgrade());
};

module.exports = ForcePower;
