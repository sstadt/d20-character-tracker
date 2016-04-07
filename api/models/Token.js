/**
* Token.js
*
* @description :: User Registration/Password reset tokens
*                 TODO set up ttl and expire/remove tokens after 24 hours
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    token: {
      type: 'string',
      required: true
    },
    user: {
      type: 'string',
      required: true
    }

  }
};
