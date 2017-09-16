
var config = require('../../lib/config.js');
var Service = require('../../classes/Service.js');

var urlRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

module.exports = {
  template: require('./imageFinderTemplate.html'),
  props: {
    value: {
      default: ''
    },
    aspect: {
      type: String,
      default: 'landscape',
      validator(value) {
        return ['portrait', 'landscape'].indexOf(value) > -1;
      }
    }
  },
  data() {
    return {
      apiService: null,
      searching: false,
      searchResults: [],
      show: false,
      currentPage: 1,
      numRows: 2,
      lastSearch: '',
      imageSearch: this.value
    };
  },
  computed: {
    previewStyle() {
      let img = this.imageSearch.match(urlRegex) ? this.imageSearch : config.defaultAvatar;

      return {
        'background-image': `url(${img})`
      };
    },
    imagesPerRow() {
      return this.aspect === 'portrait' ? 5 : 3;
    },
    numPages() {
      return Math.max(Math.ceil(this.searchResults.length / (this.numRows * this.imagesPerRow)), 1);
    },
    imagesPerPage() {
      return this.numRows * this.imagesPerRow;
    },
    startIndex() {
      return this.imagesPerPage * (this.currentPage - 1);
    },
    endIndex() {
      return this.startIndex + this.imagesPerPage - 1;
    },
    prevDisabled() {
      return this.currentPage < 2;
    },
    nextDisabled() {
      return this.currentPage > this.numPages - 1;
    }
  },
  created() {
    this.apiService = new Service({
      schema: config.endpoints.api
    });
  },
  methods: {
    parseResults(items) {
      var images = [];

      _.forEach(items, function (item) {
        _.forEach(item.pagemap.cse_image, function (image) {
          images.push(image.src);
        });
      });

      return images;
    },
    search() {
      var self = this;

      if (self.imageSearch === self.lastSearch && self.imageSearch !== '') {
        self.show = true;
      } else if (!self.searching) {
        self.searching = true;

        this.apiService.imageSearch({ q: self.imageSearch })
          .then(function (response) {
            console.log(response);
            self.lastSearch = self.imageSearch;
            self.searchResults = self.parseResults(response.items);
            self.show = self.searchResults.length > 0;
          }, function (error) {
            console.error(error);
          })
          .done(function () {
            self.searching = false;
          });
      }
    },
    previousPage() {
      if (!this.prevDisabled) this.currentPage--;
    },
    nextPage() {
      if (!this.nextDisabled) this.currentPage++;
    },
    setImage(image) {
      this.imageSearch = image;
      this.$emit('input', image);
      this.show = false;
    }
  }
};
