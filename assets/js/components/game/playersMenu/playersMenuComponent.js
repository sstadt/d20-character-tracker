
module.exports = {
  template: require('./playersMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  }
};
