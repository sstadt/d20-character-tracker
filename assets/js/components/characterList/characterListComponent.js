
module.exports = {
  template: require('./characterListTemplate.html'),
  props: {
    characters: {
      type: Array,
      default: []
    }
  },
  methods: {
    openCharacter(character) {
      console.log(`open ${character.name}`);
    },
    deleteCharacter(characterId) {
      console.log(`delete character with id ${characterId}`);
    }
  }
};
