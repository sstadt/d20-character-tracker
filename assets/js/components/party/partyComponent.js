
module.exports = {
  template: require('./partyTemplate.html'),
  props: {
    game: {
      type: Object,
      required: true
    }
  },
  components: {
    player: require('./player/playerComponent.js')
  }
};
