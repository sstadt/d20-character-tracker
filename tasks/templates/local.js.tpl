
/**
 * Local environment settings
 *
 * Note: This file is included in .gitignore
 *
 * For more information, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.local.html
 */

module.exports = {

  hookTimeout: 60000,

  email: {
    gmail: { // development
      address: '',
      password: ''
    }<% if (prod) { %>,
    mailGunKey: '' // production<% } %>
  },

  hash: '', // https://www.grc.com/passwords.htm

  apiKeys: {
    googleCustomSearch: ''
  },

  db: {
    app: {
      host: '<%- db_host %>',
      user: '',
      password: ''
    },
    session: {
      host: '<%- db_host %>',
      user: '',
      password: ''
    }
  },

  // port: process.env.PORT || 1337,

   // environment: process.env.NODE_ENV || 'development'

};
