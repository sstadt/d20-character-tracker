/*jslint node: true*/
/*globals sails*/

/**
 * Mail Service
 *
 * Functions related to sending mail
 */

var nodemailer = require("nodemailer");

var transporterSettings = {
  production: {
    host: 'localhost',
    auth: {
      user: 'noreply',
      pass: sails.config.email.noreply.password
    }
  },
  development: {
    service: "Gmail",
    auth: {
      user: sails.config.email.noreply.address,
      pass: sails.config.email.noreply.password
    }
  }
};

var transporter = nodemailer.createTransport(_.extend(transporterSettings[sails.config.environment]));

module.exports = {

  /**
   * Send a mail message from Gmail
   *
   * @param  {string}   to       The recipient email address
   * @param  {string}   subj     The email subject
   * @param  {string}   msg      The email message body
   * @param  {Function} callback The function to execute once the service has completed the send operation
   */
  send: function (to, subj, msg, callback) {

    // setup e-mail data with unicode symbols
    var options = {
      to: to, // list of receivers
      subject: sails.config.globals.site.title + ' ' + subj, // Subject line
      text: msg, // plaintext body
      html: msg // html body
    };

    // send mail with defined transport object
    // @todo: this doesn't return anything to the function, will have to log errors or something
    transporter.sendMail(options, callback);
  }

};
