
var testData = require('./_testData.js');

var gameComponent = require('./gameComponent.js');
var userService = require('../../services/userService.js');
var gameService = require('../../services/gameService.js');

Vue.config.silent = true;

describe('The game component', function () {
  var component, mockGame, mockGameLog, mockUser1, mockUser2, mockUser3;

  beforeEach(function () {
    mockGame = _.clone(testData.game);
    mockGameLog = _.clone(testData.log);
    mockUser1 = _.clone(testData.user1);
    mockUser2 = _.clone(testData.user2);
    mockUser3 = _.clone(testData.user3);

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

      componentInstance.gameAlert = { close: jasmine.createSpy() };
      componentInstance.game = mockGame;
      componentInstance.gameLog = mockGameLog;
    });

    describe('#sendChatMessage', function () {
      describe('on success', function () {
        beforeEach(function () {
          componentInstance.chatMessage = 'foo';
          spyOn(gameService, 'sendMessage').and.callFake(function () {
            return q.resolve();
          });
        });

        it('should call the chatMessage method of gameService', function () {
          componentInstance.sendChatMessage()
            .then(function () {
              expect(gameService.sendMessage).toHaveBeenCalledWith(mockGame, 'foo');
            });
        });

        it('should clear the chat message', function () {
          componentInstance.sendChatMessage()
            .then(function () {
              expect(componentInstance.chatMessage).toEqual('');
            });
        });

        it('should close the game alert', function () {
          componentInstance.sendChatMessage()
            .then(function () {
              expect(componentInstance.gameAlert.close).toHaveBeenCalled();
            });
        });
      });
    });
  });

});
