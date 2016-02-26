
define([
  'vue.min',
  'component/diceRoller/rollChannels/rollChannelsComponent'
], function (Vue, rollChannelsComponent) {

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

    describe('methods', function () {
      var componentInstance;

      beforeEach(function () {
        componentInstance = new Vue(component);
      });

      // describe('#sayHi', function () {
      //   it('should be a function', function () {
      //     expect(typeof componentInstance.sayHi).toBe('function');
      //   });
      // });
    });

  });

});
