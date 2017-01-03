
module.exports = {
  template: require('./playerTemplate.html'),
  props: {
    player: {
      type: Object,
      required: true
    },
    online: {
      type: Array,
      defaultsTo: []
    }
  },
  computed: {
    playerIsOnline() {
      return this.online.indexOf(this.player.id) > -1;
    }
  }
};
