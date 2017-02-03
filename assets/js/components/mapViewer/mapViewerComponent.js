
module.exports = {
  template: require('./mapViewerTemplate.html'),
  data() {
    return {
      activeMap: 'https://s3.amazonaws.com/ssdcgametable/site_structure/sw_galaxymap.jpg',
      left: 0,
      top: 0,
      mapZoom: 20 // 100% start
    };
  },
  computed: {
    mapScale() {
      var factor = ((this.mapZoom / 100) * 490 + 10) / 100;
      return `translateX(-50%) translateY(-50%) scale(${factor}, ${factor})`;
    }
  }
};
