
module.exports = {
  template: require('./starWarsCrawlTemplate.html'),
  data: function () {
    return {
      running: false,
    };
  },
  methods: {
    startCrawl: function (musicDelay) {
      var self = this;

      musicDelay = musicDelay || 9000;

      self.running = true;
      setTimeout(function () {
        self.$els.crawlMusic.play();
      }, musicDelay);
    },
    endCrawl: function () {
      this.running = false;
    }
  }
};
