
module.exports = {
  template: require('./mapViewerTemplate.html'),
  data() {
    return {
      activeMap: 'https://s3.amazonaws.com/ssdcgametable/site_structure/sw_galaxymap.jpg',
      left: 0,
      top: 0,
      mapZoom: 50
    };
  }
};
