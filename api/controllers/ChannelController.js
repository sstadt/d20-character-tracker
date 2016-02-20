/**
 * ChannelController
 *
 * @description :: Server-side logic for managing Channels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  join: function (req, res) {
    var channelName = req.param('name');

    Channel.findOne({ name: channelName }, function (err, channel) {
      if (err) {
        req.serverError(err);
      }

      if (channel) {
        Channel.subscribe(req.socket, channel.id);

        Roll.find({ channel: channel.id }, function (err, rolls) {
          if (err) {
            res.serverError(err);
          }

          res.json({
            channel: channel,
            rolls: rolls
          });
        });
      } else {
        Channel.create({ name: channelName }, function (err, channel) {
          if (err) {
            res.serverError(err);
          }

          Channel.subscribe(req.socket, channel.id);

          res.json({
            channel: channel,
            rolls: []
          });
        });
      }
    });
  }
};

