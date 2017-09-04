
module.exports = {
  template: require('./charactersTemplate.html'),
  props: {
    characters: {
      type: Array,
      default: []
    }
  }
};
