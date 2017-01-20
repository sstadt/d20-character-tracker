
var Pipe = require('../../classes/Pipe.js');

var userService = require('../../services/userService.js');

module.exports = {
  template: require('./userProfileTemplate.html'),
  data() {
    return {
      user: {},
      currentView: 'games',
      dropzone: {},
      uploadProgress: 0
    };
  },
  created() {
    var self = this;

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
        Vue.nextTick(self.initPhotoUpload);
        self.initUserPipe();
      });
  },
  components: {
    profile: require('./profile/profileComponent.js'),
    games: require('./games/gamesComponent.js'),
    characters: require('./characters/charactersComponent.js')
  },
  computed: {
    userName() {
      return (this.user.id) ? this.user.chatHandle : '';
    },
    userAvatar() {
      return (this.user.config && this.user.config.avatar) ? this.user.config.avatar : '/images/avatar_ph.jpg';
    },
    uploadInProgress() {
      return this.uploadProgress !== 0;
    }
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    initPhotoUpload() {
      var self = this;

      this.dropzone = new Dropzone(this.$refs.profilePictureUpload, {
        url: '/user/uploadPhoto',
        acceptedFiles: 'image/*',
        addedfile() {
          self.uploadProgress = 0;
        },
        thumbnail() {},
        uploadprogress(file, progress) {
          self.uploadProgress = progress;
        },
        success(file, response) {
          self.uploadProgress = 0;
        },
        error(msg) {
          console.error(msg);
          self.uploadProgress = 0;
          self.$refs.notifications.alert('There was an error uploading your image');
        }
      });
    },
    initUserPipe() {
      var UserPipe = new Pipe('user');

      UserPipe.on('playerConfigUpdated', this.playerConfigUpdated);
    },
    playerConfigUpdated(data) {
      if (data.config) {
        this.user.config = data.config;
      }
    }
  }
};
