
define(function () {

  var defaults = {
    name: 'Bob',
    race: 'Human',
    career: 'Jedi',
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
    this.background = data.background || '';

    this.race = data.race || defaults.race;
    this.career = data.career || defaults.career;
    this.specializations = data.specializations || [];

    this.brawn = data.brawn || defaults.brawn;
    this.agility = data.agility || defaults.agility;
    this.intellect = data.intellect || defaults.intellect;
    this.cunning = data.cunning || defaults.cunning;
    this.willpower = data.willpower || defaults.willpower;
    this.presence = data.presence || defaults.presence;

    this.experience = {
      earned: 0,
      spent: 0
    };

    this.wallet = {
      credits: 500,
      skills: []
    };

    this.skills = {};
    this.powers = {};
  }

  return Character;
});