/**
* Roll.js
*
* @description :: TODO will be removed once rolls are integrated with game logs
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    overallResults: {
      type: 'json',
      required: true
    },
    results: {
      type: 'json',
      required: true
    },
    description: {
      type: 'string',
      defaultsTo: ''
    }
  }
};
