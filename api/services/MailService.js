/*jslint node: true*/
/*globals sails*/

/**
 * Mail Service
 *
 * Functions related to sending mail
 */

 // gmail in dev
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: sails.config.email.noreply.address,
    pass: sails.config.email.noreply.password
  }
});

// mailgun in prod
var mailgunOptions = {
  apiKey: sails.config.email.mailGunKey,
  domain: sails.config.globals.baseurl.production
};
var mailgun = (!_.isUndefined(mailgunOptions.apiKey)) ? require('mailgun-js')(mailgunOptions) : undefined;

var from = (sails.config.environment === 'production') ? 'postmaster@' + mailgunOptions.domain : sails.config.email.noreply.address;

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

    var messageOptions = {
      from: sails.config.globals.site.title + '<' + from + '>', // sender
      to: to,                                                   // recipient
      subject: sails.config.globals.site.title + ' ' + subj,    // Subject line
      text: msg,                                                // plaintext body
      html: msg                                                 // html body
    };

    if (sails.config.environment === 'production') {
      mailgun.messages().send(messageOptions, callback);
    } else {
      transporter.sendMail(messageOptions, callback);
    }
  }

};
