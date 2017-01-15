
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
