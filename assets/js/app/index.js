

if (_.isUndefined(localStorage) || _.isUndefined(sessionStorage)) {
  console.error('You are in incognito mode, some interface settings may not be saved between sessions');
}

require('../lib/vue.filters.js');
require('../lib/vue.themes.js');
require('../lib/components');

new Vue({
  el: '#app',
  methods: {
    openDialog(name) {
      this.$refs[name].open();
    },
    closeDialog(name) {
      this.$refs[name].close();
    }
  }
});
