
var Vue = require('vue');
var gameListComponent = require('./gameListComponent.js');
var gameService = require('../../services/gameService');

describe('The gameList component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(gameListComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('games', function () {
      it('should be an array', function () {
        expect(component.props.games.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.games.required).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance, mockGame1, mockGame2, mockGame3, testPlayer;

    beforeEach(function () {
      componentInstance = new Vue(component);

      mockGame1 = {
        id: 1,
        gameMaster: { id: 'player3' },
        players: [{ id: 'player1' }],
        requestingPlayers: [{ id: 'player2' }]
      };

      mockGame2 = {
        id: 2,
        gameMaster: { id: 'player4' },
        players: [{ id: 'player2' }],
        requestingPlayers: [{ id: 'player3' }]
      };

      mockGame3 = {
        id: 3,
        gameMaster: { id: 'player2' },
        players: [],
        requestingPlayers: []
      };

      testPlayer = mockGame1.requestingPlayers[0];
      componentInstance.user = { id: 'player5' };
    });

    describe('#hasRequestedJoin', function () {
      it('should return true if the player is in the game\'s requestingPlayers', function () {
        expect(componentInstance.hasRequestedJoin(mockGame1, testPlayer)).toEqual(true);
        expect(componentInstance.hasRequestedJoin(mockGame2, testPlayer)).toEqual(false);
        expect(componentInstance.hasRequestedJoin(mockGame3, testPlayer)).toEqual(false);
      });
    });

    describe('#hasJoined', function () {
      it('should return true if the player is the GM or in the players', function () {
        expect(componentInstance.hasJoined(mockGame1, testPlayer)).toEqual(false);
        expect(componentInstance.hasJoined(mockGame2, testPlayer)).toEqual(true);
        expect(componentInstance.hasJoined(mockGame3, testPlayer)).toEqual(true);
      });
    });

    describe('#joinGame', function () {
      describe('on success', function () {
        beforeEach(function () {
          spyOn(gameService, 'join').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
          });
        });

        it('should add the player to the requestingPlayers', function () {
          componentInstance.games = [mockGame3];
          componentInstance.joinGame(componentInstance.games[0])
            .then(function () {
              var index = _.findIndex(componentInstance.games[0].requestingPlayers, function (player) {
                return player.id === componentInstance.user.id;
              });

              expect(index).toBeGreaterThan(-1);
            });
        });
      });

      describe('on error', function () {
        beforeEach(function () {
          spyOn(componentInstance, '$dispatch');
          spyOn(gameService, 'join').and.callFake(function () {
            var deferred = q.defer();
            deferred.reject('fail');
            return deferred.promise;
          });
        });

        it('should dispatch an event to the parent', function () {
          componentInstance.joinGame(mockGame3)
            .then(function () {
              expect(componentInstance.$dispatch).toHaveBeenCalled();
            });
        });
      });
    });
  });

});
