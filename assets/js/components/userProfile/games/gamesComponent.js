
module.exports = {
  template: require('./gamesTemplate.html'),
  props: {
    games: {
      type: Array,
      required: true
    }
  },
  methods: {
    gameListError(err) {
      this.$emit('error', err);
    }
  }
};
