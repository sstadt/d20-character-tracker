
module.exports = {
  template: require('./starWarsCrawlTemplate.html'),
  props: {
    show: {
      type: Boolean,
      require: true,
      twoWay: false
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      defaultsTo: ''
    },
    body: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      running: false,
      finished: false,
      timer: {},
      player: {}
    };
  },
  watch: {
    show(val) {
      var self = this;

      if (val === true) {
        setTimeout(function () {
          self.startCrawl();
        }, 800);
      }
    }
  },
  computed: {
    compiledBody: function () {
      return marked(this.body, { sanitize: true });
    }
  },
  created() {
    // assumes the root has a game component as the first child with a crawlMusic el where the audio player lives
    this.player = this.$root.$refs.crawlMusic;
  },
  events: {
    'reset-crawl'() {
      if (this.running) {
        this.finished = true;
      }

      return !this.running;
    }
  },
  methods: {
    startCrawl(musicDelay) {
      var self = this;

      musicDelay = musicDelay || 8900;

      self.running = true;
      self.finished = false;
      self.timer = setTimeout(function () {
        self.player.play();
      }, musicDelay);
    },
    endCrawl() {
      this.finished = true;
    },
    replay() {
      var self = this;

      self.running = false;
      Vue.nextTick(function () {
        self.startCrawl();
      });
    },
    close() {
      clearTimeout(this.timer);
      this.player.pause();
      this.player.currentTime = 0;
      this.running = false;
      this.finished = false;
      this.show = false;
    }
  }
};
