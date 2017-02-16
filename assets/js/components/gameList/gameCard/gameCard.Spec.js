
var gameCardComponent = require('./gameCardComponent.js');

Vue.config.silent = true;

describe('The gameCard component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(gameCardComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance, mockGame1, mockGame2, mockGame3, testPlayer;

    beforeEach(function () {
      component.propsData = {
        game: {
          id: 1,
          gameMaster: { id: 'player3' },
          players: [{ id: 'player1' }],
          requestingPlayers: [{ id: 'player2' }]
        }
      };
      componentInstance = new Vue(component);
    });

    describe('#hasRequestedJoin', function () {
      it('should return true if the player is in the game\'s requestingPlayers', function () {
        componentInstance.user = { id: 'player2' };
        expect(componentInstance.hasRequestedJoin()).toEqual(true);
      });

      it('should return false if the player is not in the game\'s requestingPlayers', function () {
        componentInstance.user = { id: 'player1' };
        expect(componentInstance.hasRequestedJoin()).toEqual(false);
      });
    });

    describe('#hasJoined', function () {
      it('should return true if the player is the GM or in the players', function () {
        componentInstance.user = { id: 'player3' };
        expect(componentInstance.hasJoined()).toEqual(true);
        componentInstance.user = { id: 'player1' };
        expect(componentInstance.hasJoined()).toEqual(true);
      });

      it('should return false if the player is not the GM or in the players', function () {
        componentInstance.user = { id: 'player2' };
        expect(componentInstance.hasJoined()).toEqual(false);
      });
    });

    describe('#joinGame', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance, '$emit');
          spyOn(componentInstance.gameService, 'join').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.joinGame().done(() => done());
        });

        it('should pass the game id to the gameService.join function', function () {
          expect(componentInstance.gameService.join).toHaveBeenCalledWith({ game: 1 });
        });

        it('should dispatch an event to the parent', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });
  });

});
