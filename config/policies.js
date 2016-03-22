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
    'sandbox': 'sandbox'
  },

  RollController: {
    '*': 'socketSessionAuth',
    'index': 'sessionAuth',
    'destroy': false,
    'update': false
  },

  ChannelController: {
    '*': false,
    'join': 'sessionAuth',
    'leave': 'sessionAuth'
  },

  GameController: {
    '*': 'sessionAuth'
  },

  CrawlController: {
    '*': 'sessionAuth',
    'update': ['sessionAuth', 'crawlOwner'],
    'destroy': ['sessionAuth', 'crawlOwner']
  },

  ApiController: {
    '*': false,
    'index': true,
    'show': true
  }
};
