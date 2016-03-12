
var Vue = require('vue');

module.exports = {
  template: require('./starWarsCrawlTemplate.html'),
  props: {
    show: {
      type: Boolean,
      require: true,
      twoWay: false
    }
  },
  data: function () {
    return {
      running: false,
      finished: false,
      timer: {}
    };
  },
  watch: {
    show: function (val) {
      var self = this;

      if (val === true) {
        setTimeout(function () {
          self.startCrawl();
        }, 800);
      }
    }
  },
  methods: {
    startCrawl: function (musicDelay) {
      var self = this;

      musicDelay = musicDelay || 8800;

      self.running = true;
      self.finished = false;
      self.timer = setTimeout(function () {
        self.$els.crawlMusic.play();
      }, musicDelay);
    },
    endCrawl: function () {
      this.finished = true;
    },
    replay: function () {
      var self = this;

      self.running = false;
      Vue.nextTick(function () {
        self.startCrawl();
      });
    },
    close: function () {
      clearTimeout(this.timer);
      this.$els.crawlMusic.pause();
      this.$els.crawlMusic.currentTime = 0;
      this.running = false;
      this.finished = false;
      this.show = false;
    }
  }
};
