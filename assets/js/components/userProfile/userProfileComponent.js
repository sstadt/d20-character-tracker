
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
      myCharacters: [
        {id: 1, name: 'Luke Skywalker', imageUrl: 'https://www.dailydot.com/wp-content/uploads/f49/d9/f66e75bc5e9ee939825e6b468706a0d6.jpg'},
        {id: 2, name: 'Obi Wan Kenobi', imageUrl: 'http://cdn.images.express.co.uk/img/dynamic/36/590x/secondary/alecobi-682521.jpg'},
        {id: 3, name: 'Han Solo', imageUrl: 'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/01/26/15/harrison-ford-han-solo.jpg'},
        {id: 4, name: 'Chewbacca', imageUrl: 'http://cf.broadsheet.ie/wp-content/uploads/2016/11/Chewbacca-starwars.jpg'},
        {id: 5, name: 'Princess Leia', imageUrl: 'http://images.hellogiggles.com/uploads/2017/01/13231646/Princess-Leia-11.jpg'},
        {id: 6, name: 'C-3PO', imageUrl: 'https://lumiere-a.akamaihd.net/v1/images/C-3PO-See-Threepio_68fe125c.jpeg?region=0%2C45%2C1408%2C704'},
        {id: 7, name: 'R2-D2', imageUrl: 'https://i.ytimg.com/vi/8tjMM67-aao/maxresdefault.jpg'}
      ],
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
        // self.myCharacters = myCharacters;
      }, function error(reason) {
        self.$refs.notifications.alert(reason);
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
    }
  }
};
