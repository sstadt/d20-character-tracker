
var testData = require('../_testData.js');

var playersMenuComponent = require('./playersMenuComponent.js');

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
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      component.propsData = { game: mockGame };
      componentInstance = new Vue(component);

      spyOn(componentInstance, '$emit');
    });

    describe('#approvePlayer', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'approvePlayer').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.approvePlayer(testData.user1).done(function () { done(); });
        });

        it('should emit an error message', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#declinePlayer', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'declinePlayer').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.declinePlayer(testData.user1).done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#removePlayer', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'removePlayer').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.removePlayer(testData.user2).done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });
  });

});
