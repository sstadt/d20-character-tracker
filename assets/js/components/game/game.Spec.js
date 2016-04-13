
var testData = require('./_testData.js');

var gameComponent = require('./gameComponent.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

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

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.gameAlert = {
        close: jasmine.createSpy(),
        error: jasmine.createSpy()
      };
      componentInstance.game = mockGame;
      componentInstance.gameLog = mockGameLog;
    });

    describe('#sendChatMessage', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          componentInstance.chatMessage = 'foo';
          spyOn(gameService, 'sendMessage').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.sendChatMessage().done(function () { done(); });
        });

        it('should call the chatMessage method of gameService', function () {
          expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
        });

        it('should clear the chat message', function () {
          expect(componentInstance.chatMessage).toEqual('');
        });

        it('should close the game alert', function () {
          expect(componentInstance.gameAlert.close).toHaveBeenCalled();
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          componentInstance.chatMessage = 'foo';
          spyOn(gameService, 'sendMessage').and.callFake(function () {
            return q.reject('bar');
          });

          componentInstance.sendChatMessage().done(function () { done(); });
        });

        it('should call the chatMessage method of gameService', function () {
          expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
        });

        it('should show an error', function () {
          expect(componentInstance.gameAlert.error).toHaveBeenCalledWith('bar');
        });
      });
    });

    describe('#playCrawl', function () {
      beforeEach(function () {
        componentInstance.playCrawl(mockCrawl);
      });

      it('should set the crawl data', function () {
        expect(componentInstance.crawlTitle).toEqual(mockCrawl.title);
        expect(componentInstance.crawlSubtitle).toEqual(mockCrawl.subtitle);
        expect(componentInstance.crawlCrawl).toEqual(mockCrawl.crawl);
        expect(componentInstance.crawlImage).toEqual(mockCrawl.imageUrl);
      });

      it('should start the crawl', function () {
        expect(componentInstance.showCrawl).toEqual(true);
      });
    });
  });

});
