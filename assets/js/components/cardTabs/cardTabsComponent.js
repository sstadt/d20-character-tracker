
module.exports = {
  template: require('./cardTabsTemplate.html'),
  data() {
    return {
      tabs: []
    };
  },
  computed: {
    showTabs() {
      var hasActiveTab = false;

      _.forEach(this.tabs, function (tab) {
        if (tab.active === true) hasActiveTab = true;
      });

      return hasActiveTab;
    }
  },
  methods: {
    addTab(newTab) {
      this.tabs.push(newTab);
    },
    activate(selectedTab) {
      _.forEach(this.tabs, function (tab) {
        tab.active = (selectedTab.name === tab.name && !tab.active);
      });
    }
  }
};
