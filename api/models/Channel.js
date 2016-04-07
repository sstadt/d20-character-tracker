/**
* Channel.js
*
* @description :: Chat channel information
*                 TODO separate into user chat channels as a future feature
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    rolls: {
      type: 'array',
      defaultsTo: []
    }
  }
};
