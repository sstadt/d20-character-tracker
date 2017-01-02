
module.exports = {
  template: require('./jukeboxTemplate.html'),
  props: {
    playlist: {
      type: Array,
      required: true
    }
  },
  methods: {
    playTrack(name) {
      this.$refs[name][0].play();
    },
    pauseTrack(name) {
      this.$refs[name][0].pause();
    },
    stopTrack(name) {
      this.$refs[name][0].pause();
      this.$refs[name][0].currentTime = 0;
    },
    trackFinished(name) {
      this.$emit('track-finished', name);
    }
  }
};
