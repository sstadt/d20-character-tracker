
var testData = require('../_testData.js');

var constants = require('../../../config/constants.js');
var settingsMenuComponent = require('./settingsMenuComponent.js');
var gameService = require('../../../services/gameService.js');

Vue.config.silent = true;

describe('The settingsMenu component', function () {
  var component, mockGame;

  beforeEach(function () {
    mockGame = _.clone(testData.game);
    component = _.clone(settingsMenuComponent);
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

      componentInstance.gameSettingsAlert = {
        close: jasmine.createSpy(),
        error: jasmine.createSpy()
      };

      spyOn(componentInstance, '$dispatch');
      componentInstance.game = mockGame;
    });

    describe('#closeModal', function () {
      it('should dispatch an event to the game component', function () {
        componentInstance.closeModal();
        expect(componentInstance.$dispatch).toHaveBeenCalledWith(constants.events.game.closeSettings);
      });
    });

    describe('#updateConfig', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'updateConfig').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.updateConfig().done(function () { done(); });
        });

        it('should close the game settings alert', function () {
          expect(componentInstance.gameSettingsAlert.close).toHaveBeenCalled();
        });

        it('should dispatch an event to the game component', function () {
          expect(componentInstance.$dispatch).toHaveBeenCalledWith(constants.events.game.closeSettings);
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(gameService, 'updateConfig').and.callFake(function () {
            return q.reject('foo');
          });

          componentInstance.updateConfig().done(function () { done(); });
        });

        it('should show an error message', function () {
          expect(componentInstance.gameSettingsAlert.error).toHaveBeenCalledWith('foo');
        });
      });
    });
  });

});
