
var testData = require('../_testData.js');

var Crawl = require('./crawl.class.js');
var crawlMenuComponent = require('./crawlMenuComponent.js');
var gameService = require('../../../services/gameService.js');

Vue.config.silent = true;

describe('The crawlMenu component', function () {
  var component, mockGame, mockCrawl;

  beforeEach(function () {
    mockCrawl = _.clone(testData.game.crawls[0]);
    mockGame = _.clone(testData.game);
    component = _.clone(crawlMenuComponent);
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

  // describe('methods', function () {
  //   var componentInstance;
  //
  //   beforeEach(function () {
  //     componentInstance = new Vue(component);
  //
  //     componentInstance.gameCrawlsAlert = {
  //       close: jasmine.createSpy(),
  //       error: jasmine.createSpy()
  //     };
  //
  //     spyOn(componentInstance, '$emit');
  //     componentInstance.game = mockGame;
  //   });
  //
  //   describe('#closeModal', function () {
  //     it('should emit an event to the game component', function () {
  //       componentInstance.closeModal();
  //       expect(componentInstance.$emit).toHaveBeenCalledWith('close');
  //     });
  //   });
  //
  //   describe('#addCrawl', function () {
  //     describe('on success', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'addCrawl').and.callFake(function () {
  //           return q.resolve();
  //         });
  //
  //         componentInstance.activeCrawl.title = 'foo';
  //         componentInstance.addingCrawl = true;
  //         componentInstance.addCrawl().done(function () { done(); });
  //       });
  //
  //       it('should close the game crawls alert', function () {
  //         expect(componentInstance.gameCrawlsAlert.close).toHaveBeenCalled();
  //       });
  //
  //       it('should reset the active crawl', function () {
  //         expect(componentInstance.activeCrawl).toEqual(new Crawl());
  //       });
  //
  //       it('should disable the addint crawl flag', function () {
  //         expect(componentInstance.addingCrawl).toEqual(false);
  //       });
  //     });
  //
  //     describe('on error', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'addCrawl').and.callFake(function () {
  //           return q.reject('bar');
  //         });
  //
  //         componentInstance.addCrawl().done(function () { done(); });
  //       });
  //
  //       it('should show an error', function () {
  //         expect(componentInstance.gameCrawlsAlert.error).toHaveBeenCalledWith('bar');
  //       });
  //     });
  //   });
  //
  //   describe('#editCrawl', function () {
  //     beforeEach(function () {
  //       componentInstance.addingCrawl = true;
  //       componentInstance.editCrawl(mockCrawl);
  //     });
  //
  //     it('should hide the adding crawl form', function () {
  //       expect(componentInstance.addingCrawl).toEqual(false);
  //     });
  //
  //     it('should set the active crawl to the passed in crawl', function () {
  //       expect(componentInstance.activeCrawl).toEqual(mockCrawl);
  //     });
  //   });
  //
  //   describe('#saveCrawl', function () {
  //     describe('on success', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'updateCrawl').and.callFake(function () {
  //           return q.resolve();
  //         });
  //
  //         componentInstance.activeCrawl = mockCrawl;
  //         componentInstance.saveCrawl().done(function () { done(); });
  //       });
  //
  //       it('should close the game crawls alert', function () {
  //         expect(componentInstance.gameCrawlsAlert.close).toHaveBeenCalled();
  //       });
  //
  //       it('should reset the active crawl', function () {
  //         expect(componentInstance.activeCrawl).toEqual(new Crawl());
  //       });
  //     });
  //
  //     describe('on error', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'updateCrawl').and.callFake(function () {
  //           return q.reject('bar');
  //         });
  //
  //         componentInstance.saveCrawl().done(function () { done(); });
  //       });
  //
  //       it('should show an error', function () {
  //         expect(componentInstance.gameCrawlsAlert.error).toHaveBeenCalledWith('bar');
  //       });
  //     });
  //   });
  //
  //   describe('#cancelEdit', function () {
  //     beforeEach(function () {
  //       componentInstance.activeCrawl = mockCrawl;
  //       componentInstance.cancelEdit();
  //     });
  //
  //     it('should reset the active crawl', function () {
  //       expect(componentInstance.activeCrawl).toEqual(new Crawl());
  //     });
  //   });
  //
  //   describe('#deleteCrawl', function () {
  //     beforeEach(function () {
  //       // mock child component to pass through confirmation
  //       componentInstance.$refs = { gameCrawlsConfirm: { ask: function (data) { data.yes(); } } };
  //     });
  //
  //     describe('on success', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'deleteCrawl').and.callFake(function () {
  //           return q.resolve();
  //         });
  //
  //         componentInstance.deleteCrawl(0).done(function () { done(); });
  //       });
  //
  //       it('should close the alert', function () {
  //         expect(componentInstance.gameCrawlsAlert.close).toHaveBeenCalled();
  //       });
  //     });
  //
  //     describe('on error', function () {
  //       beforeEach(function (done) {
  //         spyOn(gameService, 'deleteCrawl').and.callFake(function () {
  //           return q.reject('bar');
  //         });
  //
  //         componentInstance.deleteCrawl(0).done(function () { done(); });
  //       });
  //
  //       it('should show an error', function () {
  //         expect(componentInstance.gameCrawlsAlert.error).toHaveBeenCalledWith('bar');
  //       });
  //     });
  //   });
  //
  //   describe('#playCrawl', function () {
  //     beforeEach(function () {
  //       componentInstance.playCrawl(mockCrawl);
  //     });
  //
  //     it('should set the crawl data', function () {
  //       expect(componentInstance.demoCrawl.title).toEqual(mockCrawl.title);
  //       expect(componentInstance.demoCrawl.subtitle).toEqual(mockCrawl.subtitle);
  //       expect(componentInstance.demoCrawl.crawl).toEqual(mockCrawl.crawl);
  //       expect(componentInstance.demoCrawl.image).toEqual(mockCrawl.imageUrl);
  //     });
  //
  //     it('should start the crawl', function () {
  //       expect(componentInstance.demoCrawl.show).toEqual(true);
  //     });
  //   });
  // });

});
