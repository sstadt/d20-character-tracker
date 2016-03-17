
module.exports = {
  template: require('./settingsMenuTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true,
      twoWay: true
    }
  },
  method: {
    cancel: function () {
      console.log('cancel clicked');
    }
  }
};
