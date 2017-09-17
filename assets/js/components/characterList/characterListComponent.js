
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
      currentCharacter: {},
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
      this.currentCharacter = _.clone(character);
      Vue.nextTick(() => this.$refs.characterCard.open());
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
