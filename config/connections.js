/**
 * Connections
 * (sails.config.connections)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 *
 * More adapters: https://github.com/balderdashy/sails
 */

var localDb = require('./local.js').db.app;

module.exports.connections = {

  /****************************
  *     Disk (local only)     *
  ****************************/
  // localDiskDb: {
  //   adapter: 'sails-disk'
  // },

  /****************************
  *           MySQL           *
  ****************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER',
  //   password: 'YOUR_MYSQL_PASSWORD',
  //   database: 'YOUR_MYSQL_DB'
  // },

  /****************************
  *          MongoDB          *
  ****************************/
  mongodb: {
    adapter: 'sails-mongo',
    host: localDb.host,
    port: 27017,
    user: localDb.user,
    password: localDb.password,
    database: 'sails_sw_game_table'
  },

  /****************************
  *        PostgreSQL         *
  ****************************/
  // somePostgresqlServer: {
  //   adapter: 'sails-postgresql',
  //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_POSTGRES_USER',
  //   password: 'YOUR_POSTGRES_PASSWORD',
  //   database: 'YOUR_POSTGRES_DB'
  // }

};
