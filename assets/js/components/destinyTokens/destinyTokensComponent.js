
module.exports = {
  template: require('./destinyTokensTemplate.html'),
  props: {
    isGameMaster: {
      type: Boolean,
      defaultsTo: false
    }
  },
  data() {
    return {
      light: 5,
      dark: 7,
      iconSpacing: 6
    };
  },
  components: {
    token: require('./token/tokenComponent.js')
  },
  methods: {
    useToken(type) {
      if (type === 'dark' && this.dark > 0) {
        this.dark--;
        this.light++;
      }

      if (type === 'light' && this.light > 0) {
        this.light--;
        this.dark++;
      }
    }
  }
};
