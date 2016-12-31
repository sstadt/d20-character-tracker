
var testData = require('../_testData.js');

var playersMenuComponent = require('./playersMenuComponent.js');
var gameService = require('../../../services/gameService.js');

Vue.config.silent = true;

describe('The playersMenu component', function () {
  var component, mockGame;

  beforeEach(function () {
    mockGame = _.clone(testData.game);
    component = _.clone(playersMenuComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('game', function () {
      it('should be an object', function () {
        expect(component.props.game.type).toEqual(Object);
      });

      it('should be required', function () {
        expect(component.props.game.required).toEqual(true);
      });

      it('should be a two way binding', function () {
        expect(component.props.game.twoWay).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);

      componentInstance.gamePlayersAlert = {
        close: jasmine.createSpy(),
        error: jasmine.createSpy()
      };

      componentInstance.game = mockGame;
    });

    describe('#approvePlayer', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'approvePlayer').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.approvePlayer().done(function () { done(); });
        });

        it('should close the game players alert', function () {
          expect(componentInstance.gamePlayersAlert.close).toHaveBeenCalled();
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'approvePlayer').and.callFake(function () {
            return q.reject('foo');
          });

          componentInstance.approvePlayer().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.gamePlayersAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });

    describe('#declinePlayer', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'declinePlayer').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.declinePlayer().done(function () { done(); });
        });

        it('should close the game players alert', function () {
          expect(componentInstance.gamePlayersAlert.close).toHaveBeenCalled();
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'declinePlayer').and.callFake(function () {
            return q.reject('foo');
          });

          componentInstance.declinePlayer().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.gamePlayersAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });

    describe('#removePlayer', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'removePlayer').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.removePlayer().done(function () { done(); });
        });

        it('should close the game players alert', function () {
          expect(componentInstance.gamePlayersAlert.close).toHaveBeenCalled();
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'removePlayer').and.callFake(function () {
            return q.reject('foo');
          });

          componentInstance.removePlayer().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.gamePlayersAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });
  });

});
