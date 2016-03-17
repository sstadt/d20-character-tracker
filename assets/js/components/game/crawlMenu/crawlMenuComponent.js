
module.exports = {
  template: require('./crawlMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  }
};
