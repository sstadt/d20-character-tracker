
var testData = require('./_testData.js');

var gameComponent = require('./gameComponent.js');

Vue.config.silent = true;

describe('The game component', function () {
  var component, mockGame, mockGameLog, mockUser1, mockUser2, mockUser3, mockCrawl;

  beforeEach(function () {
    mockGame = _.clone(testData.game);
    mockGameLog = _.clone(testData.log);
    mockUser1 = _.clone(testData.user1);
    mockUser2 = _.clone(testData.user2);
    mockUser3 = _.clone(testData.user3);
    mockCrawl = _.clone(testData.game.crawls[0]);

    component = _.clone(gameComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('gameId', function () {
      it('should be a string', function () {
        expect(component.props.gameId.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.gameId.required).toEqual(true);
      });
    });
  });

  describe('computed', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.game = mockGame;
      componentInstance.gameLog = mockGameLog;
    });

    describe('userIsGameMaster', function () {
      it('should be true if the current user is the game master', function () {
        componentInstance.user = mockUser1;
        expect(componentInstance.userIsGameMaster).toEqual(true);
      });

      it('should be false if the current user is not the game master', function () {
        componentInstance.user = mockUser2;
        expect(componentInstance.userIsGameMaster).toEqual(false);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.game = mockGame;
      componentInstance.gameLog = mockGameLog;
    });

    describe('#playCrawl', function () {
      beforeEach(function () {
        componentInstance.$refs = {
          crawl: {
            play: jasmine.createSpy()
          }
        };

        componentInstance.playCrawl(mockCrawl);
      });

      it('should set the crawl data', function () {
        expect(componentInstance.activeCrawl.title).toEqual(mockCrawl.title);
        expect(componentInstance.activeCrawl.subtitle).toEqual(mockCrawl.subtitle);
        expect(componentInstance.activeCrawl.crawl).toEqual(mockCrawl.crawl);
        expect(componentInstance.activeCrawl.image).toEqual(mockCrawl.imageUrl);
      });

      it('should start the crawl', function () {
        expect(componentInstance.$refs.crawl.play).toHaveBeenCalled();
      });
    });
  });

});
