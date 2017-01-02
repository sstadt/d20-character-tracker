
module.exports = {
  template: require('./starWarsCrawlTemplate.html'),
  props: {
    // show: {
    //   type: Boolean,
    //   require: true,
    //   twoWay: false
    // },
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
      show: false
    };
  },
  // watch: {
  //   show(val) {
  //     var self = this;
  //
  //     if (val === true) {
  //       setTimeout(function () {
  //         self.startCrawl();
  //       }, 800);
  //     }
  //   }
  // },
  computed: {
    compiledBody: function () {
      return marked(this.body, { sanitize: true });
    }
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
    play() {
      var self = this;

      self.show = true;

      setTimeout(function () {
        self.startCrawl();
      }, 800);
    },
    startCrawl(musicDelay) {
      var self = this;

      musicDelay = musicDelay || 8900;

      self.running = true;
      self.finished = false;
      self.timer = setTimeout(function () {
        self.$emit('play-music', 'crawl');
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
      this.$emit('stop-music', 'crawl');
      this.running = false;
      this.finished = false;
      this.show = false;
    }
  }
};
