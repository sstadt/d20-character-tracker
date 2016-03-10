
var q = require('q');
var Vue = require('vue');

var constants = require('../../config/constants.js');
var userService = require('../../services/userService.js');
var channelService = require('../../services/channelService.js');
var rollChannelsComponent = require('./rollChannelsComponent.js');

require('../common/alert/alert.js');

Vue.config.silent = true;

describe('The rollChannels component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(rollChannelsComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    describe('channel', function () {
      it('should exist', function () {
        expect(component.props.channel).toEqual(jasmine.any(Object));
      });

      it('should be an object', function () {
        expect(component.props.channel.type).toEqual(Object);
      });

      it('should be a two way binding', function () {
        expect(component.props.channel.twoWay).toEqual(true);
      });

      it('should be required', function () {
        expect(component.props.channel.required).toEqual(true);
      });
    });

    describe('chatHandle', function () {
      it('should exist', function () {
        expect(component.props.chatHandle).toEqual(jasmine.any(Object));
      });

      it('should be an string', function () {
        expect(component.props.chatHandle.type).toEqual(String);
      });

      it('should be a two way binding', function () {
        expect(component.props.chatHandle.twoWay).toEqual(true);
      });

      it('should be required', function () {
        expect(component.props.chatHandle.required).toEqual(true);
      });
    });

    describe('localRolls', function () {
      it('should exist', function () {
        expect(component.props.localRolls).toEqual(jasmine.any(Object));
      });

      it('should be an array', function () {
        expect(component.props.localRolls.type).toEqual(Array);
      });

      it('should be a two way binding', function () {
        expect(component.props.localRolls.twoWay).toEqual(true);
      });

      it('should be required', function () {
        expect(component.props.localRolls.required).toEqual(true);
      });
    });

    describe('channelRolls', function () {
      it('should exist', function () {
        expect(component.props.channelRolls).toEqual(jasmine.any(Object));
      });

      it('should be an array', function () {
        expect(component.props.channelRolls.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.channelRolls.required).toEqual(true);
      });
    });
  });

  describe('data', function () {
    var data;

    beforeEach(function () {
      data = component.data();
    });

    it('should have a joinChannelPrompt', function () {
      expect(data.joinChannelPrompt).toEqual(jasmine.any(Object));
      expect(data.joinChannelPrompt.name).toEqual(jasmine.any(String));
      expect(data.joinChannelPrompt.label).toEqual(jasmine.any(String));
    });

    it('should have a handlePrompt', function () {
      expect(data.handlePrompt).toEqual(jasmine.any(Object));
      expect(data.handlePrompt.name).toEqual(jasmine.any(String));
      expect(data.handlePrompt.label).toEqual(jasmine.any(String));
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      spyOn(componentInstance, '$broadcast');
    });

    describe('#clearLocalRolls', function () {
      beforeEach(function () {
        componentInstance.localRolls = [{}];
        componentInstance.clearLocalRolls();
      });

      it('should reset localRolls', function () {
        expect(componentInstance.localRolls).toEqual([]);
      });
    });

    describe('#openSetChatHandlePrompt', function () {
      beforeEach(function () {
        componentInstance.openSetChatHandlePrompt();
      });

      it('should open the chat handle prompt', function () {
        expect(componentInstance.$broadcast).toHaveBeenCalledWith(constants.events.prompt.promptUser, componentInstance.handlePrompt.name);
      });
    });

    describe('#openJoinChannelPrompt', function () {
      beforeEach(function () {
        componentInstance.openJoinChannelPrompt();
      });

      it('should open the join channel prompt', function () {
        expect(componentInstance.$broadcast).toHaveBeenCalledWith(constants.events.prompt.promptUser, componentInstance.joinChannelPrompt.name);
      });
    });

    describe('#setChatHandle', function () {
      beforeEach(function () {
        componentInstance.chatHandle = '';
      });

      describe('on success', function () {
        beforeEach(function (done) {
          spyOn(userService, 'setChatHandle').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve();
            return deferred.promise;
          });

          componentInstance.setChatHandle('test handle').done(function () { done(); });
        });

        it('should set the chat handle', function () {
          expect(componentInstance.chatHandle).toEqual('test handle');
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          componentInstance.rollChannelsAlert.error = jasmine.createSpy('error');
          spyOn(console, 'error');
          spyOn(userService, 'setChatHandle').and.callFake(function () {
            var deferred = q.defer();
            deferred.reject('test error');
            return deferred.promise;
          });

          componentInstance.setChatHandle('test handle').done(function () { done(); });
        });

        it('should not set the chat handle', function () {
          expect(componentInstance.chatHandle).toEqual('');
        });

        it('should show an error', function () {
          expect(componentInstance.rollChannelsAlert.error).toHaveBeenCalled();
        });
      });
    });

    // TODO: Need tests for #joinChannel

    describe('#leaveChannel', function () {
      beforeEach(function () {
        componentInstance.channelRolls = [{}];
      });

      describe('on success', function () {
        beforeEach(function (done) {
          componentInstance.channel = { id: '1234' };

          spyOn(channelService, 'leave').and.callFake(function () {
            var deferred = q.defer();
            deferred.resolve({});
            return deferred.promise;
          });

          componentInstance.leaveChannel().done(function () { done(); });
        });

        it('should remove the channel data', function () {
          expect(componentInstance.channel).toEqual({});
        });

        it('should reset the channelRolls', function () {
          expect(componentInstance.channelRolls.length).toEqual(0);
        });
      });

      describe('on error', function () {
        beforeEach(function (done) {
          componentInstance.channel = { id: '1234' };
          componentInstance.rollChannelsAlert.error = jasmine.createSpy('error');
          spyOn(console, 'error');
          spyOn(channelService, 'leave').and.callFake(function () {
            var deferred = q.defer();
            deferred.reject('test error');
            return deferred.promise;
          });

          componentInstance.leaveChannel().done(function () { done(); });
        });

        it('should not remove the channel data', function () {
          expect(componentInstance.channel).toEqual({ id: '1234' });
        });

        it('should not reset the channelRolls', function () {
          expect(componentInstance.channelRolls.length).toEqual(1);
        });

        it('should show an error', function () {
          expect(componentInstance.rollChannelsAlert.error).toHaveBeenCalled();
        });
      });
    });
  });

  describe('events', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
    });

    it('should be an object', function () {
      expect(component.events).toEqual(jasmine.any(Object));
    });

    describe('*valueSubmitted', function () {
      var data;

      beforeEach(function () {
        spyOn(componentInstance, 'setChatHandle');
        spyOn(componentInstance, 'joinChannel');
        data = { value: 'test' };
      });

      it('should be a function', function () {
        expect(typeof component.events[constants.events.prompt.valueSubmitted]).toBe('function');
      });

      it('should call #setChatHandle when passed a value and the name of the handle prompt', function () {
        data.name = componentInstance.handlePrompt.name;
        componentInstance.$emit(constants.events.prompt.valueSubmitted, data);
        expect(componentInstance.setChatHandle).toHaveBeenCalled();
      });

      it('should call #joinChannel when passed a value and the name of the join channel prompt', function () {
        data.name = componentInstance.joinChannelPrompt.name;
        componentInstance.$emit(constants.events.prompt.valueSubmitted, data);
        expect(componentInstance.joinChannel).toHaveBeenCalled();
      });
    });
  });

});
