
define(function () {

  var defaults = {
    name: 'Bob',
    class: 'Noob',
    strength: 12,
    dexterity: 12,
    constitution: 12,
    intellect: 12,
    wisdom: 12,
    charisma: 12
  };

  return function Character(data) {
    data = data || {};

    this.name = data.name ||defaults.name;
    this.class = data.class || defaults.class;
    this.strength = data.strength || defaults.strength;
    this.dexterity = data.dexterity || defaults.dexterity;
    this.constitution = data.constitution || defaults.constitution;
    this.intellect = data.intellect || defaults.intellect;
    this.wisdom = data.wisdom || defaults.wisdom;
    this.charisma = data.charisma || defaults.charsima;
  };
});