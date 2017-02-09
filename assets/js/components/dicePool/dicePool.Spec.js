
var dicePoolComponent = require('./dicePoolComponent.js');

Vue.config.silent = true;

describe('The dicePool component', function () {
  var component;

  beforeEach(function () {
    component = _.clone(dicePoolComponent);
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

    describe('game', function () {
      it('should be a string', function () {
        expect(component.props.game.type).toEqual(String);
      });

      it('should be required', function () {
        expect(component.props.game.required).toEqual(true);
      });
    });
  });

    describe('methods', function () {
      var componentInstance;

      beforeEach(function () {
        componentInstance = new Vue(component);
      });

      describe('#roll', function () {
        beforeEach(function () {
          spyOn(componentInstance, 'hasDice').and.callThrough();
          spyOn(componentInstance, 'resetDicePool');
          spyOn(componentInstance, '$emit');
        });

        describe('when there are no dice in the dice pool', function () {
          beforeEach(function (done) {
            spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
              return q.resolve();
            });

            componentInstance.roll().done(function () { done(); });
          });

          it('should check that there are dice to roll', function () {
            expect(componentInstance.hasDice).toHaveBeenCalled();
          });

          it('should not call gameService.sendRoll', function () {
            expect(componentInstance.gameService.sendRoll).not.toHaveBeenCalled();
          });
        });

        describe('when there are dice in the pool', function () {
          beforeEach(function (done) {
            componentInstance.dice.ability = 2;
            componentInstance.darkToken = true;

            spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
              return q.resolve();
            });

            componentInstance.roll().done(function () { done(); });
          });

          it('should check that there are dice to roll', function () {
            expect(componentInstance.hasDice).toHaveBeenCalled();
          });

          it('should call gameService.sendRoll', function () {
            expect(componentInstance.gameService.sendRoll).toHaveBeenCalledWith(jasmine.any(Object));
          });
        });

        describe('on success', function () {
          beforeEach(function (done) {
            componentInstance.dice.proficiency = 2;
            componentInstance.lightToken = true;
            componentInstance.rollDescription = 'foo';

            spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
              return q.resolve();
            });

            componentInstance.roll().done(function () { done(); });
          });

          it('should call gameService.sendRoll with the dicePool, rollDescription, and token status', function () {
            var expectedTokens = {
                light: true,
                dark: false
              }, expectedDicePool = {
                ability: 0,
                proficiency: 2,
                difficulty: 0,
                challenge: 0,
                boost: 0,
                setback: 0,
                force: 0
              };

            expect(componentInstance.gameService.sendRoll).toHaveBeenCalledWith({ dicePool: expectedDicePool, description: 'foo', tokens: expectedTokens });
          });

          it('should reset the dice pool', function () {
            expect(componentInstance.resetDicePool).toHaveBeenCalled();
          });
        });

        describe('on error', function () {
          beforeEach(function (done) {
            componentInstance.dice.proficiency = 2;

            spyOn(componentInstance.gameService, 'sendRoll').and.callFake(function () {
              return q.reject({ err: 'bar' });
            });

            componentInstance.roll().done(function () { done(); });
          });

          it('should emit an error event with the error message', function () {
            expect(componentInstance.$emit).toHaveBeenCalledWith('error', 'bar');
          });
        });
      });

      describe('#hasDice', function () {
        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.ability = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.proficiency = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.difficulty = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.challenge = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.boost = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.setback = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return true if there is an ability die in the pool', function () {
          componentInstance.dice.force = 1;
          expect(componentInstance.hasDice()).toEqual(true);
        });

        it('should return false if there are no dice in the pool', function () {
          expect(componentInstance.hasDice()).toEqual(false);
        });
      });

      describe('#resetDicePool', function () {
        beforeEach(function () {
          componentInstance.dice.ability = 1;
          componentInstance.dice.proficiency = 1;
          componentInstance.dice.difficulty = 1;
          componentInstance.dice.challenge = 1;
          componentInstance.dice.boost = 1;
          componentInstance.dice.setback = 1;
          componentInstance.dice.force = 1;
          componentInstance.lightToken = true;
          componentInstance.darkToken = true;
          componentInstance.rollDescription = 'foo';
          componentInstance.resetDicePool();
        });

        it('should set all dice quantities to 0', function () {
          expect(componentInstance.dice.ability).toEqual(0);
          expect(componentInstance.dice.proficiency).toEqual(0);
          expect(componentInstance.dice.difficulty).toEqual(0);
          expect(componentInstance.dice.challenge).toEqual(0);
          expect(componentInstance.dice.boost).toEqual(0);
          expect(componentInstance.dice.setback).toEqual(0);
          expect(componentInstance.dice.force).toEqual(0);
        });

        it('should set light and dark tokens to false', function () {
          expect(componentInstance.lightToken).toEqual(false);
          expect(componentInstance.darkToken).toEqual(false);
        });

        it('should set the rollDescription to an empty string', function () {
          expect(componentInstance.rollDescription).toEqual('');
        });
      });

      describe('#dropHandler', function () {
        var dropEvent;

        beforeEach(function () {
          spyOn(componentInstance, 'addDie');
          spyOn(componentInstance, 'addToken');
          dropEvent = { dataTransfer: { getData: function () {} } };
        });

        describe('on die drop', function () {
          beforeEach(function () {
            spyOn(dropEvent.dataTransfer, 'getData').and.returnValue('ability');
            componentInstance.dropHandler(dropEvent);
          });

          it('should call addDie with the appropriate die type', function () {
            expect(componentInstance.addDie).toHaveBeenCalledWith('ability');
          });
        });

        describe('on light token drop', function () {
          beforeEach(function () {
            spyOn(dropEvent.dataTransfer, 'getData').and.returnValue('light-token');
            componentInstance.dropHandler(dropEvent);
          });

          it('should call addToken with the string \'light\'', function () {
            expect(componentInstance.addToken).toHaveBeenCalledWith('light');
          });
        });

        describe('on dark token drop', function () {
          beforeEach(function () {
            spyOn(dropEvent.dataTransfer, 'getData').and.returnValue('dark-token');
            componentInstance.dropHandler(dropEvent);
          });

          it('should call addToken with the string \'dark\'', function () {
            expect(componentInstance.addToken).toHaveBeenCalledWith('dark');
          });
        });
      });

      describe('#addToken', function () {
        describe('with a passed in light token', function () {
          describe('and no ability dice in the pool', function () {
            beforeEach(function () {
              componentInstance.addToken('light');
            });

            it('should not add a light token', function () {
              expect(componentInstance.lightToken).toEqual(false);
            });
          });

          describe('with at least 1 ability die in the pool', function () {
            beforeEach(function () {
              componentInstance.dice.ability = 1;
              componentInstance.addToken('light');
            });

            it('should set lightToken to true', function () {
              expect(componentInstance.lightToken).toEqual(true);
            });

            it('should decrement ability dice in the pool', function () {
              expect(componentInstance.dice.ability).toEqual(0);
            });

            it('should increment proficiency dice in the pool', function () {
              expect(componentInstance.dice.proficiency).toEqual(1);
            });
          });
        });

        describe('with a passed in dark token', function () {
          describe('and no ability dice in the pool', function () {
            beforeEach(function () {
              componentInstance.addToken('dark');
            });

            it('should not add a dark token', function () {
              expect(componentInstance.darkToken).toEqual(false);
            });
          });

          describe('with at least 1 difficulty die in the pool', function () {
            beforeEach(function () {
              componentInstance.dice.difficulty = 1;
              componentInstance.addToken('dark');
            });

            it('should set darkToken to true', function () {
              expect(componentInstance.darkToken).toEqual(true);
            });

            it('should decrement difficulty dice in the pool', function () {
              expect(componentInstance.dice.difficulty).toEqual(0);
            });

            it('should increment challenge dice in the pool', function () {
              expect(componentInstance.dice.challenge).toEqual(1);
            });
          });
        });
      });

      describe('#removeToken', function () {
        describe('with a passed in light token', function () {
          it('should set lightToken to false', function () {
            componentInstance.lightToken = true;
            componentInstance.removeToken('light');
            expect(componentInstance.lightToken).toEqual(false);
          });

          describe('when there are proficiency dice in the pool', function () {
            beforeEach(function () {
              componentInstance.lightToken = true;
              componentInstance.dice.proficiency = 1;
              componentInstance.removeToken('light');
            });

            it('should decrement the proficiency dice in the pool', function () {
              expect(componentInstance.dice.proficiency).toEqual(0);
            });

            it('should increment the ability dice in the pool', function () {
              expect(componentInstance.dice.ability).toEqual(1);
            });
          });
        });

        describe('with a passed in dark token', function () {
          it('should set darkToken to false', function () {
            componentInstance.darkToken = true;
            componentInstance.removeToken('dark');
            expect(componentInstance.darkToken).toEqual(false);
          });

          describe('when there are proficiency dice in the pool', function () {
            beforeEach(function () {
              componentInstance.darkToken = true;
              componentInstance.dice.challenge = 1;
              componentInstance.removeToken('dark');
            });

            it('should decrement the challenge dice in the pool', function () {
              expect(componentInstance.dice.challenge).toEqual(0);
            });

            it('should increment the difficulty dice in the pool', function () {
              expect(componentInstance.dice.difficulty).toEqual(1);
            });
          });
        });
      });

      describe('#addDie', function () {
        it('should add an ability die when ability is passed in', function () {
          componentInstance.addDie('ability');
          expect(componentInstance.dice.ability).toEqual(1);
        });

        it('should add an proficiency die when proficiency is passed in', function () {
          componentInstance.addDie('proficiency');
          expect(componentInstance.dice.proficiency).toEqual(1);
        });

        it('should add an difficulty die when difficulty is passed in', function () {
          componentInstance.addDie('difficulty');
          expect(componentInstance.dice.difficulty).toEqual(1);
        });

        it('should add an challenge die when challenge is passed in', function () {
          componentInstance.addDie('challenge');
          expect(componentInstance.dice.challenge).toEqual(1);
        });

        it('should add an boost die when boost is passed in', function () {
          componentInstance.addDie('boost');
          expect(componentInstance.dice.boost).toEqual(1);
        });

        it('should add an setback die when setback is passed in', function () {
          componentInstance.addDie('setback');
          expect(componentInstance.dice.setback).toEqual(1);
        });

        it('should add an force die when force is passed in', function () {
          componentInstance.addDie('force');
          expect(componentInstance.dice.force).toEqual(1);
        });
      });

      describe('#removeDie', function () {
        it('should remove a ability die, when ability is passed in', function () {
          componentInstance.dice.ability = 1;
          componentInstance.removeDie('ability');
          expect(componentInstance.dice.ability).toEqual(0);
        });

        it('should remove a proficiency die, when proficiency is passed in', function () {
          componentInstance.dice.proficiency = 1;
          componentInstance.removeDie('proficiency');
          expect(componentInstance.dice.proficiency).toEqual(0);
        });

        it('should remove a difficulty die, when difficulty is passed in', function () {
          componentInstance.dice.difficulty = 1;
          componentInstance.removeDie('difficulty');
          expect(componentInstance.dice.difficulty).toEqual(0);
        });

        it('should remove a challenge die, when challenge is passed in', function () {
          componentInstance.dice.challenge = 1;
          componentInstance.removeDie('challenge');
          expect(componentInstance.dice.challenge).toEqual(0);
        });

        it('should remove a boost die, when boost is passed in', function () {
          componentInstance.dice.boost = 1;
          componentInstance.removeDie('boost');
          expect(componentInstance.dice.boost).toEqual(0);
        });

        it('should remove a setback die, when setback is passed in', function () {
          componentInstance.dice.setback = 1;
          componentInstance.removeDie('setback');
          expect(componentInstance.dice.setback).toEqual(0);
        });

        it('should remove a force die, when force is passed in', function () {
          componentInstance.dice.force = 1;
          componentInstance.removeDie('force');
          expect(componentInstance.dice.force).toEqual(0);
        });
      });

      describe('#dragEnter', function () {
        it('should set droppable to true', function () {
          componentInstance.dragEnter();
          expect(componentInstance.droppable).toEqual(true);
        });
      });

      describe('#dragLeave', function () {
        it('should set droppable to true', function () {
          componentInstance.droppable = true;
          componentInstance.dragLeave();
          expect(componentInstance.droppable).toEqual(false);
        });
      });
    });

});
