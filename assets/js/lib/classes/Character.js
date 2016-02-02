
define(function () {

  var defaults = {
    name: 'Bob',
    career: 'Noob',
    brawn: 2,
    agility: 2,
    cunning: 2,
    intellect: 2,
    willpower: 2,
    presence: 2
  };

  function Character(data) {
    data = data || {};

    this.name = data.name ||defaults.name;
    this.career = data.career || defaults.career;
    this.brawn = data.brawn || defaults.brawn;
    this.agility = data.agility || defaults.agility;
    this.intellect = data.intellect || defaults.intellect;
    this.cunning = data.cunning || defaults.cunning;
    this.willpower = data.willpower || defaults.willpower;
    this.presence = data.presence || defaults.presence;
  }

  Character.prototype.clearStats = function () {
    this.brawn = undefined;
    this.agility = undefined;
    this.intellect = undefined;
    this.cunning = undefined;
    this.willpower = undefined;
    this.presence = undefined;
  };

  return Character;
});