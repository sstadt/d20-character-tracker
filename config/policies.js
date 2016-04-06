/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': 'sessionAuth',

  '/': true,

  SessionController: {
    '*': ['flash', true],
    'destroy': 'sessionAuth'
  },

  UserController: {
    '*': ['flash', true],
    'create': true,
    'show': 'sessionAuth',
    'search': false,
    'self': 'sessionAuth',
    'setHandle': 'sessionAuth',
    'sandbox': 'dev',
    'destroy': false
  },

  RollController: {
    '*': 'socketSessionAuth',
    'index': 'dev',
    'destroy': false,
    'update': false
  },

  ChannelController: {
    '*': false,
    'join': 'sessionAuth',
    'leave': 'sessionAuth'
  },

  GameController: {
    '*': 'sessionAuth',
    'updateConfig': ['sessionAuth', 'gameMaster'],
    'addCrawl': ['sessionAuth', 'gameMaster'],
    'approvePlayer': ['sessionAuth', 'gameMaster'],
    'declinePlayer': ['sessionAuth', 'gameMaster'],
    'removePlayer': ['sessionAuth', 'gameMaster'],
    'destroy': false
  },

  GameLogController: {
    '*': false, // Game controller is responsible for creation/deletion
    'get': 'sessionAuth', // TODO need an isPlayer policy here
    'addMessage': 'sessionAuth' // TODO need an isPlayer policy here
  },

  CrawlController: {
    '*': 'sessionAuth',
    'update': ['sessionAuth', 'gameMaster'],
    'destroy': ['sessionAuth', 'gameMaster']
  },

  ApiController: {
    '*': false,
    'index': true,
    'show': true
  }
};
