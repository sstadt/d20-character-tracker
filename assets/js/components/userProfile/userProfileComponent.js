
var Pipe = require('../../classes/Pipe.js');
var Service = require('../../classes/Service.js');

var util = require('../../lib/util.js');
var config = require('../../lib/config.js');

var userService = require('../../services/userService.js');

module.exports = {
  template: require('./userProfileTemplate.html'),
  data() {
    return {
      user: {},
      currentView: 'characters',
      dropzone: {},
      uploadProgress: 0,
      myGames: [],
      myCharacters: [],
      gameService: undefined,
      characterService: undefined
    };
  },
  created() {
    var self = this;

    self.gameService = new Service({
      schema: config.endpoints.game
    });
    self.characterService = new Service({
      schema: config.endpoints.character
    });

    // get user data
    userService.getUserInfo()
      .then(function success(user) {
        self.user = user;
        Vue.nextTick(self.initPhotoUpload);
        self.initUserPipe();
      });

    // get user games
    self.gameService.getMyGames()
      .then(function success(myGames) {
        self.myGames = myGames;
      }, function error(reason) {
        self.$refs.notifications.alert(reason);
      });

    // get user characters
    self.characterService.get()
      .then(function success(myCharacters) {
        self.myCharacters = myCharacters;
      }, function error(reason) {
        self.$refs.notifications.alert(reason);
      });

    window.addEventListener(config.events.notify, function (event) {
      self.$refs.notifications[event.detail.type](event.detail.msg);
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
      return (this.user.config && this.user.config.avatar) ? this.user.config.avatar : config.defaultAvatar;
    },
    uploadInProgress() {
      return this.uploadProgress !== 0;
    },
    loadingUser() {
      return (this.user.id) ? false : true;
    }
  },
  methods: {
    setView(view) {
      this.currentView = view;
    },
    error(msg) {
      self.$refs.notifications.alert(msg);
    },
    initPhotoUpload() {
      var self = this;

      /* start dropzone */
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
      /* end dropzone */
    },
    initUserPipe() {
      var UserPipe = new Pipe('user');

      UserPipe.on('playerConfigUpdated', this.playerConfigUpdated);
      UserPipe.on('playerJoinApproved', this.playerJoinApproved);
      UserPipe.on('removedFromGame', this.removedFromGame);
      UserPipe.on('newCharacterCreated', this.newCharacterCreated);
      UserPipe.on('characterUpdated', this.characterUpdated);
      UserPipe.on('characterRemoved', this.characterRemoved);
    },
    playerConfigUpdated(data) {
      if (data.config) {
        this.user.config = data.config;
      }
    },
    playerJoinApproved(data) {
      this.myGames.push(data.game);
    },
    removedFromGame(data) {
      var myGamesIndex = util.getIndexById(this.myGames, data.game.id);

      if (myGamesIndex > -1) {
        this.myGames.splice(myGamesIndex, 1);
      }
    },
    newCharacterCreated(data) {
      this.myCharacters.push(data.character);
    },
    characterUpdated(data) {
      var characterIndex = util.getIndexById(this.myCharacters, data.character.id);

      if (characterIndex > -1) {
        this.myCharacters.splice(characterIndex, 1, _.extend(data.character));
      }
    },
    characterRemoved(data) {
      var characterIndex = util.getIndexById(this.myCharacters, data.character);

      if (characterIndex > -1) {
        this.myCharacters.splice(characterIndex, 1);
      }
    }
  }
};
