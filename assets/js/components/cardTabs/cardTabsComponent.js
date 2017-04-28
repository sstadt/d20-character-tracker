
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
        console.log(selectedTab.name, tab.name, tab.active);
        tab.active = (selectedTab.name === tab.name && !tab.active);
      });
    }
  }
};
