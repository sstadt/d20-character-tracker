/**
 * ChannelController
 *
 * @description :: Server-side logic for managing Channels
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  join: function (req, res) {
    var channelName = req.param('channel');

    Channel.findOne({ name: channelName }, function (err, channel) {
      if (err) {
        req.serverError(err);
      }

      if (channel) {
        Channel.subscribe(req.socket, channel);
        res.json(channel);
      } else {
        Channel.create({ name: channel }, function (err, channel) {
          if (err) {
            res.serverError(err);
          }

          Channel.subscribe(req.socket, channel);
          res.json(channel);
        });
      }
    });
  }
};

