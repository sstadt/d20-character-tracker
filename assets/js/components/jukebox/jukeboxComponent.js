
module.exports = {
  template: require('./jukeboxTemplate.html'),
  props: {
    playlist: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      volumeControl: 50,
      muted: false
    };
  },
  watch: {
    volumeControl() {
      this.setVolume();
    }
  },
  computed: {
    soundStatusIcon() {
      var iconName;

      if (this.muted) {
        iconName = 'volume-mute';
      } else if (this.volumeControl < 34) {
        iconName = 'volume-low';
      } else if (this.volumeControl < 67) {
        iconName = 'volume-mid';
      } else {
        iconName = 'volume-high';
      }

      return iconName;
    }
  },
  mounted() {
    this.setVolume();
  },
  methods: {
    setVolume() {
      var newVolume = this.volumeControl / 100;

      for (var track in this.$refs) {
        if (this.muted) {
          this.$refs[track][0].muted = true;
        } else {
          this.$refs[track][0].muted = false;
          this.$refs[track][0].volume = newVolume;
        }
      }
    },
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
    },
    toggleMute() {
      this.muted = !this.muted;
      this.setVolume();
    }
  }
};
