
/**
 * Session Configuration
 * (sails.config.session)
 *
 * For more information on configuring the session, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.session.html
 */

var localDb = require('./local.js').db.session;

module.exports.session = {

  secret: 'e62bd7077bafb43f00ff057d12ba7c3c',

  // cookie: {
  //   maxAge: 24 * 60 * 60 * 1000
  // }

  /****************************
  *           Redis           *
  ****************************/

  // adapter: 'redis',
  // host: 'localhost',
  // port: 6379,
  // username: '',
  // password: '',
  // ttl: <redis session TTL in seconds>,
  // db: 0,
  // pass: <redis auth password>
  // prefix: 'sess:'
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

  /****************************
  *           Mongo           *
  ****************************/

  adapter: 'mongo',
  host: localDb.host,
  port: 27017,
  // username: '',
  // password: '',
  db: 'sails_sw_game_table_sessions',
  collection: 'sessions',
  // auto_reconnect: false,
  // ssl: false,
  // stringify: true

};
