
var jukeboxComponent = require('./jukeboxComponent.js');

Vue.config.silent = true;

describe('The jukebox component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(jukeboxComponent);
  });

  it('to be an object', function () {
    expect(component).toEqual(jasmine.any(Object));
  });

  it('should have a template', function () {
    expect(component.template).toEqual(jasmine.any(String));
  });

  describe('props', function () {
    it('should be an object', function () {
      expect(component.props).toEqual(jasmine.any(Object));
    });

    describe('playlist', function () {
      it('should be a string', function () {
        expect(component.props.playlist.type).toEqual(Array);
      });

      it('should be required', function () {
        expect(component.props.playlist.required).toEqual(true);
      });
    });
  });

  describe('methods', function () {
    var componentInstance;

    beforeEach(function () {
      componentInstance = new Vue(component);
      componentInstance.$refs = {
        foo: [{
          currentTime: 0,
          play: jasmine.createSpy('play'),
          pause: jasmine.createSpy('pause')
        }]
      };
    });

    describe('#playTrack', function () {
      beforeEach(function () {
        componentInstance.playTrack('foo');
      });

      it('should call the track play method', function () {
        expect(componentInstance.$refs.foo[0].play).toHaveBeenCalled();
      });
    });

    describe('#pauseTrack', function () {
      beforeEach(function () {
        componentInstance.$refs.foo[0].currentTime = 100;
        componentInstance.pauseTrack('foo');
      });

      it('should call the track pause method', function () {
        expect(componentInstance.$refs.foo[0].pause).toHaveBeenCalled();
      });

      it('should not reset the track\'s current time', function () {
        expect(componentInstance.$refs.foo[0].currentTime).toEqual(100);
      });
    });

    describe('#stopTrack', function () {
      beforeEach(function () {
        componentInstance.$refs.foo[0].currentTime = 100;
        componentInstance.stopTrack('foo');
      });

      it('should call the track pause method', function () {
        expect(componentInstance.$refs.foo[0].pause).toHaveBeenCalled();
      });

      it('should reset the track\'s current time', function () {
        expect(componentInstance.$refs.foo[0].currentTime).toEqual(0);
      });
    });

    describe('#trackFinished', function () {
      beforeEach(function () {
        spyOn(componentInstance, '$emit');
        componentInstance.trackFinished('foo');
      });

      it('should emit a track-finished event with the name of the track', function () {
        expect(componentInstance.$emit).toHaveBeenCalledWith('track-finished', 'foo');
      });
    });
  });

});
