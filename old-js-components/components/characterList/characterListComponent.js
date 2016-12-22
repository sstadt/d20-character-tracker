
var characterListTemplate = require('./characterListTemplate.html');

module.exports = {
  template: characterListTemplate,
  props: {
    characters: {
      type: Array,
      required: true,
      twoWay: true
    }
  }
};
