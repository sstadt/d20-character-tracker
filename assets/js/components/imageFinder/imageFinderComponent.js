
var config = require('../../lib/config.js');
var Service = require('../../classes/Service.js');

var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

module.exports = {
  template: require('./imageFinderTemplate.html'),
  data() {
    return {
      apiService: null,
      imageSearch: ''
    };
  },
  computed: {
    previewStyle() {
      let img = this.imageSearch.match(urlRegex) ? this.imageSearch : config.defaultAvatar;

      return {
        'background-image': `url(${img})`
      };
    }
  },
  created() {
    this.apiService = new Service({
      schema: config.endpoints.api
    });
  },
  methods: {
    search() {
      console.log(`search for ${this.imageSearch}`);
    }
  }
};
