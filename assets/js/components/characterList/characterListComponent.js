
var config = require('../../lib/config.js');
var util = require('../../lib/util.js');
var Service = require('../../classes/Service.js');

module.exports = {
  template: require('./characterListTemplate.html'),
  props: {
    characters: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      characterService: null,
      creatingCharacter: false,
      deletingCharacter: []
    };
  },
  created() {
    this.characterService = new Service({
      schema: config.endpoints.character
    });
  },
  methods: {
    newCharacter() {
      var self = this;
      console.log('create new character');
      if (!self.creatingCharacter) {
        self.creatingCharacter = true;
        this.characterService.createCharacter()
          .fail(function (error) {
            util.sendNotification(error.err, 'alert');
          })
          .done(() => self.creatingCharacter = false);
      }
    },
    openCharacter(character) {
      console.log(`open ${character.name}`);
    },
    deleteCharacter(characterId) {
      var self = this;

      if (self.deletingCharacter.indexOf(characterId) === -1) {
        self.deletingCharacter.push(characterId);

        self.characterService.destroyCharacter({ characterId })
          .fail(function (error) {
            util.sendNotification(error.err, 'alert');
          })
          .done(() => {
            var index = self.deletingCharacter.indexOf(characterId);
            if (index > -1) self.deletingCharacter.splice(index, 1);
          });
      }
    }
  }
};
