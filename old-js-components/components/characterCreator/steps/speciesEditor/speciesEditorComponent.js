
var apiService = require('../../../../services/fadApi.js');
var speciesEditorTemplate = require('./speciesEditorTemplate.html');

module.exports = {
  template: speciesEditorTemplate,
  props: {
    character: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  data: function () {
    return {
      speciesList: [],
      selectedSpecies: {},
    };
  },
  ready: function () {
    var self = this;

    apiService.index('species', function (err, speciesList) {
      if (err) {
        console.error(err);
      } else {
        self.speciesList = speciesList;
        self.selectedSpecies = self.speciesList[0];
      }
    });
  },
  methods: {
    updateCharacterAbilities: function () {
      this.character.brawn = this.selectedSpecies.brawn;
      this.character.agility = this.selectedSpecies.agility;
      this.character.cunning = this.selectedSpecies.cunning;
      this.character.intellect = this.selectedSpecies.intellect;
      this.character.willpower = this.selectedSpecies.willpower;
      this.character.presence = this.selectedSpecies.presence;
    }
  }
};
