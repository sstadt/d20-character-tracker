

/**
 *
 * Class Pipe
 *
 * Used as a single point of flow from sails.js
 * socket updates to the front end.
 *
 */

function Pipe(model) {
  var self = this;

  self.handlers = {};

  io.socket.on(model, function (message) {
    if (!message.data.type) {
      console.error('Socket message does not have a type');
      return;
    }

    if (this.handlers[message.data.type]) {
      this.handlers[message.data.type](message.data.data);
    }
  });
}

Pipe.prototype.on = function (type, callback) {
  this.handlers[type] = callback;
};

module.exports = Pipe;
