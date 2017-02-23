

function Upgrade() {
  this.name = '';
  this.xpCost = 0;
  this.effect = '';
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
