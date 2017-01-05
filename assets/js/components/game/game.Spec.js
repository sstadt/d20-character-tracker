
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

    // describe('#sendChatMessage', function () {
    //   describe('when no chat message is provided', function () {
    //     beforeEach(function (done) {
    //       componentInstance.chatMessage = '';
    //       spyOn(gameService, 'sendMessage').and.callFake(function () {
    //         return q.resolve();
    //       });
    //
    //       componentInstance.sendChatMessage().done(function () { done(); });
    //     });
    //
    //     it('should not call the chatMessage method of gameService', function () {
    //       expect(gameService.sendMessage).not.toHaveBeenCalled();
    //     });
    //   });
    //
    //   describe('on success', function () {
    //     beforeEach(function (done) {
    //       componentInstance.chatMessage = 'foo';
    //       spyOn(gameService, 'sendMessage').and.callFake(function () {
    //         return q.resolve();
    //       });
    //
    //       componentInstance.sendChatMessage().done(function () { done(); });
    //     });
    //
    //     it('should call the chatMessage method of gameService', function () {
    //       expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
    //     });
    //
    //     it('should clear the chat message', function () {
    //       expect(componentInstance.chatMessage).toEqual('');
    //     });
    //
    //     it('should close the game alert', function () {
    //       expect(componentInstance.gameAlert.close).toHaveBeenCalled();
    //     });
    //   });
    //
    //   describe('on error', function () {
    //     beforeEach(function (done) {
    //       componentInstance.chatMessage = 'foo';
    //       spyOn(gameService, 'sendMessage').and.callFake(function () {
    //         return q.reject('bar');
    //       });
    //
    //       componentInstance.sendChatMessage().done(function () { done(); });
    //     });
    //
    //     it('should call the chatMessage method of gameService', function () {
    //       expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
    //     });
    //
    //     it('should call the chatMessage method of gameService', function () {
    //       expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
    //     });
    //
    //     it('should not clear the chat message', function () {
    //       expect(componentInstance.chatMessage).toEqual('foo');
    //     });
    //
    //     it('should show an error', function () {
    //       expect(componentInstance.gameAlert.error).toHaveBeenCalledWith('bar');
    //     });
    //   });
    // });

    // describe('#sendChatRoll', function () {
    //   var mockDicePool;
    //
    //   beforeEach(function () {
    //     mockDicePool = { ability: 1, proficiency: 2, difficulty: 3, challenge: 4, boost: 5, setback: 4, force: 3 };
    //
    //     componentInstance.ability = mockDicePool.ability;
    //     componentInstance.proficiency = mockDicePool.proficiency;
    //     componentInstance.difficulty = mockDicePool.difficulty;
    //     componentInstance.challenge = mockDicePool.challenge;
    //     componentInstance.boost = mockDicePool.boost;
    //     componentInstance.setback = mockDicePool.setback;
    //     componentInstance.force = mockDicePool.force;
    //   });
    //
    //   describe('on success', function () {
    //     beforeEach(function (done) {
    //       componentInstance.rollDescription = 'foo';
    //       spyOn(gameService, 'sendRoll').and.callFake(function () {
    //         return q.resolve();
    //       });
    //
    //       componentInstance.sendChatRoll().done(function () { done(); });
    //     });
    //
    //     it('should call the sendRoll method of the game service', function () {
    //       expect(gameService.sendRoll).toHaveBeenCalledWith(mockGame, 'foo', mockDicePool);
    //     });
    //
    //     it('should clear the roll description', function () {
    //       expect(componentInstance.rollDescription).toEqual('');
    //     });
    //
    //     it('should close the game alert messages', function () {
    //       expect(componentInstance.gameAlert.close).toHaveBeenCalled();
    //     });
    //   });
    //
    //   describe('on error', function () {
    //     beforeEach(function (done) {
    //       componentInstance.rollDescription = 'foo';
    //       spyOn(gameService, 'sendRoll').and.callFake(function () {
    //         return q.reject('bar');
    //       });
    //
    //       componentInstance.sendChatRoll().done(function () { done(); });
    //     });
    //
    //     it('should call the sendRoll method of the game service', function () {
    //       expect(gameService.sendRoll).toHaveBeenCalledWith(mockGame, 'foo', mockDicePool);
    //     });
    //
    //     it('should not clear the roll description', function () {
    //       expect(componentInstance.rollDescription).toEqual('foo');
    //     });
    //
    //     it('should show an error message', function () {
    //       expect(componentInstance.gameAlert.error).toHaveBeenCalledWith('bar');
    //     });
    //   });
    // });
  });

});
