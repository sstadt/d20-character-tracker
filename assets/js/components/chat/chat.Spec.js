
var chatComponent = require('./chatComponent.js');

Vue.config.silent = true;

describe('The chat component', function () {
  var component, transferEvent;

  beforeEach(function () {
    component = _.clone(chatComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      transferEvent = { dataTransfer: { getData: function () {} } };
      componentInstance = new Vue(component);
      spyOn(componentInstance, '$emit');
      componentInstance.$refs = {
        chatLog: {
          scrollHeight: 300,
          offsetHeight: 100
        }
      };
    });

    describe('#rollType', function () {
      it('should append \'Roll\' to the type argument of the passed in message', function () {
        expect(componentInstance.rollType({ type: 'foo' })).toEqual('fooRoll');
      });
    });

    describe('#dropHandler', function () {
      beforeEach(function () {
        spyOn(componentInstance, 'rollTaskDie');
        spyOn(componentInstance, 'rollStandardDie');
        spyOn(componentInstance, 'useDestinyToken');
      });

      describe('when a task die is dropped', function () {
        beforeEach(function () {
          spyOn(transferEvent.dataTransfer, 'getData').and.returnValue('ability');
          componentInstance.dropHandler(transferEvent);
        });

        it('should call #rollTaskDie with the passed in type', function () {
          expect(componentInstance.rollTaskDie).toHaveBeenCalledWith('ability');
        });
      });

      describe('when a percent die is dropped', function () {
        beforeEach(function () {
          spyOn(transferEvent.dataTransfer, 'getData').and.returnValue('percent');
          componentInstance.dropHandler(transferEvent);
        });

        it('should call #rollStandardDie with a value of 100', function () {
          expect(componentInstance.rollStandardDie).toHaveBeenCalledWith(100);
        });
      });

      describe('when a light token is dropped', function () {
        beforeEach(function () {
          spyOn(transferEvent.dataTransfer, 'getData').and.returnValue('light-token');
          componentInstance.dropHandler(transferEvent);
        });

        it('should call #useDestinyToken with a value of light', function () {
          expect(componentInstance.useDestinyToken).toHaveBeenCalledWith('light');
        });
      });

      describe('when a dark token is dropped', function () {
        beforeEach(function () {
          spyOn(transferEvent.dataTransfer, 'getData').and.returnValue('dark-token');
          componentInstance.dropHandler(transferEvent);
        });

        it('should call #useDestinyToken with a value of dark', function () {
          expect(componentInstance.useDestinyToken).toHaveBeenCalledWith('dark');
        });
      });
    });

    describe('#useDestinyToken', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'useDestinyToken').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.useDestinyToken({ type: 'bar' }).done(function () { done(); });
        });

        it('should call gameService.useDestinyToken', function () {
          expect(componentInstance.gameService.useDestinyToken).toHaveBeenCalled();
        });

        it('should emit an error to the parent component', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#rollStandardDie', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.rollStandardDie(6).done(function () { done(); });
        });

        it('should call gameService.sendRoll with a die that has the number of sides provided', function () {
          expect(componentInstance.gameService.sendRoll).toHaveBeenCalledWith({ dicePool: { sides: 6 }, description: jasmine.any(String) });
        });

        it('should emit an error to the parent component', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#rollTaskDie', function () {
      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.rollTaskDie('ability').done(function () { done(); });
        });

        it('should call gameService.sendRoll with a single die of the type provided', function () {
          expect(componentInstance.gameService.sendRoll).toHaveBeenCalledWith({ dicePool: { ability: 1 }, description: jasmine.any(String) });
        });

        it('should emit an error to the parent component', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#sendChatMessage', function () {
      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'sendMessage').and.callFake(function () {
            return q.resolve();
          });

          componentInstance.chatMessage = 'bar';
          componentInstance.sendChatMessage().done(function () { done(); });
        });

        it('should call gameService.sendMessage with the current chat message', function () {
          expect(componentInstance.gameService.sendMessage).toHaveBeenCalledWith({ message: 'bar' });
        });

        it('should clear the current chat message', function () {
          expect(componentInstance.chatMessage).toEqual('');
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          spyOn(componentInstance.gameService, 'sendMessage').and.callFake(function () {
            return q.reject({ err: 'foo' });
          });

          componentInstance.chatMessage = 'bar';
          componentInstance.sendChatMessage().done(function () { done(); });
        });

        it('should call gameService.sendMessage with the current chat message', function () {
          expect(componentInstance.gameService.sendMessage).toHaveBeenCalledWith({ message: 'bar' });
        });

        it('should emit an error to the parent component', function () {
          expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'foo');
        });
      });
    });

    describe('#playCrawl', function () {
      beforeEach(function () {
        componentInstance.playCrawl({ foo: 'bar' });
      });

      it('should emit a playcrawl event to the parent with the provided call', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('play-crawl', { foo: 'bar' });
      });
    });

    describe('#scrollChatToBottom', function () {
      beforeEach(function () {
        componentInstance.$refs.chatLog.scrollTop = 0;
        componentInstance.$refs.chatLog.scrollHeight = 10;
        componentInstance.$refs.chatLog.offsetHeight = 8;
      });

      describe('when chat is scrolled to bottom', function () {
        beforeEach(function (done) {
          componentInstance.isScrolledToBottom = true;
          componentInstance.scrollChatToBottom().done(function () { done(); });
        });

        it('should set the scrollTop of the chat log to the difference of it\'s scroll height and offset height', function () {
          expect(componentInstance.$refs.chatLog.scrollTop).toEqual(2);
        });
      });

      describe('when chat is not scrolled to bottom', function () {
        beforeEach(function (done) {
          componentInstance.isScrolledToBottom = false;
          componentInstance.scrollChatToBottom().done(function () { done(); });
        });

        it('should set the scrollTop of the chat log to the difference of it\'s scroll height and offset height', function () {
          expect(componentInstance.$refs.chatLog.scrollTop).not.toEqual(2);
        });
      });
    });

    describe('#userScrolling', function () {
      it('should set isScrolledToBottom to true if the user is within 10px of the bottom', function () {
        componentInstance.$refs.chatLog.scrollHeight = 100;
        componentInstance.$refs.chatLog.scrollTop = 85;
        componentInstance.$refs.chatLog.offsetHeight = 10;
        componentInstance.userScrolling();
        expect(componentInstance.isScrolledToBottom).toEqual(true);
      });

      it('should set isScrolledToBottom to false if the user is within 10px of the bottom', function () {
        componentInstance.$refs.chatLog.scrollHeight = 100;
        componentInstance.$refs.chatLog.scrollTop = 1;
        componentInstance.$refs.chatLog.offsetHeight = 10;
        componentInstance.userScrolling();
        expect(componentInstance.isScrolledToBottom).toEqual(false);
      });
    });
  });

});
