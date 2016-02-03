
define([
  'text!./raceEditorTemplate.html'
], function (raceEditorTemplate) {

  var races = [{
      name: 'Human',
      statistics: {
        brawn: 2,
        agility: 2,
        cunning: 2,
        intellect: 2,
        willpower: 2,
        presence: 2
      }
    }, {
      name: 'Twi\'Lek',
      statistics: {
        brawn: 1,
        agility: 2,
        cunning: 2,
        intellect: 2,
        willpower: 3,
        presence: 2
      }
    }];

  return {
    template: raceEditorTemplate,
    props: {
      character: {
        type: Object,
        required: true,
        twoWay: true
      }
    },
    data: function () {
      return {
        races: races,
        selectedRace: races[0],
      };
    },
    methods: {
      updateCharacterAbilities: function () {
        this.character.brawn = this.selectedRace.statistics.brawn;
        this.character.agility = this.selectedRace.statistics.agility;
        this.character.cunning = this.selectedRace.statistics.cunning;
        this.character.intellect = this.selectedRace.statistics.intellect;
        this.character.willpower = this.selectedRace.statistics.willpower;
        this.character.presence = this.selectedRace.statistics.presence;
      }
    }
  };

});
