
module.exports = {
  template: require('./destinyTokensTemplate.html'),
  props: {
    isGameMaster: {
      type: Boolean,
      defaultsTo: false
    },
    light: {
      type: Number,
      required: true
    },
    dark: {
      type: Number,
      required: true
    }
  },
  components: {
    token: require('./token/tokenComponent.js')
  }
};
