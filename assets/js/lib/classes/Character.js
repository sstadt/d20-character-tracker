
define(function () {

  var defaults = {
    name: 'Bob',
    class: 'Noob',
    strength: 12,
    dexterity: 12,
    constitution: 12,
    intelligence: 12,
    wisdom: 12,
    charisma: 12
  };

  function Character(data) {
    data = data || {};

    this.name = data.name ||defaults.name;
    this.class = data.class || defaults.class;
    this.strength = data.strength || defaults.strength;
    this.dexterity = data.dexterity || defaults.dexterity;
    this.constitution = data.constitution || defaults.constitution;
    this.intelligence = data.intelligence || defaults.intelligence;
    this.wisdom = data.wisdom || defaults.wisdom;
    this.charisma = data.charisma || defaults.charisma;
  }

  Character.prototype.clearStats = function () {
    this.strength = undefined;
    this.dexterity = undefined;
    this.constitution = undefined;
    this.intelligence = undefined;
    this.wisdom = undefined;
    this.charisma = undefined;
  };

  return Character;
});