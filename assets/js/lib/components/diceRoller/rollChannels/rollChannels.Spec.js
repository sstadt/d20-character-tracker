
define([
  'q',
  'vue.min',
  'constants',
  'service/channelService',
  'component/diceRoller/rollChannels/rollChannelsComponent'
], function (q, Vue, constants, channelService, rollChannelsComponent) {

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

        it('should exist', function () {
          expect(typeof componentInstance.clearLocalRolls).toBe('function');
        });

        it('should reset localRolls', function () {
          expect(componentInstance.localRolls).toEqual([]);
        });
      });

      describe('#setChatHandle', function () {
        beforeEach(function () {
          componentInstance.setChatHandle();
        });

        it('should open the chat handle prompt', function () {
          expect(componentInstance.$broadcast).toHaveBeenCalledWith(constants.events.prompt.promptUser, componentInstance.handlePrompt.name);
        });
      });

      describe('#joinChannel', function () {
        beforeEach(function () {
          componentInstance.joinChannel();
        });

        it('should open the join channel prompt', function () {
          expect(componentInstance.$broadcast).toHaveBeenCalledWith(constants.events.prompt.promptUser, componentInstance.joinChannelPrompt.name);
        });
      });

      describe('#leaveChannel', function () {
        it('should exist', function () {
          expect(typeof componentInstance.leaveChannel).toBe('function');
        });

        describe('on success', function () {
          beforeEach(function () {
            componentInstance.channel = { id: '1234' };
            spyOn(channelService, 'leave').and.callFake(function () {
              var deferred = q.defer();
              deferred.resolve({});
              return deferred.promise;
            });
          });

          it('should remove the channel data', function () {
            componentInstance.leaveChannel().done(function () {
              expect(componentInstance.channel).toEqual({});
            });
          });

          it('should reset the channelRolls', function () {
            componentInstance.leaveChannel().done(function () {
              expect(componentInstance.channelRolls).toEqual([]);
            });
          });
        });
      });

      // describe('#sayHi', function () {
      //   it('should be a function', function () {
      //     expect(typeof componentInstance.sayHi).toBe('function');
      //   });
      // });
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
        it('should be a function', function () {
          expect(typeof component.events[constants.events.prompt.valueSubmitted]).toBe('function');
        });

        // it('should set the current step', function () {
        //   componentInstance.$emit(constants.events.prompt.valueSubmitted, 'attributes');
        //   expect(componentInstance.currentStep).toEqual('attributes');
        // });
      });
    });

  });

});
