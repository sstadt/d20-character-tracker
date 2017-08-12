
module.exports = {
  template: require('./cardTabsTemplate.html'),
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    addTab(newTab) {
      this.tabs.push(newTab);
    },
    activate(selectedTab) {
      _.forEach(this.tabs, function (tab) {
        tab.active = selectedTab.name === tab.name;
      });
    }
  }
};
