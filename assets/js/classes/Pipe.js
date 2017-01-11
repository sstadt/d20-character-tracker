

function Pipe(model) {
  var self = this;

  self.handlers = {};

  io.socket.on(model, function (message) {
    self.handleMessage(message);
  });
}

Pipe.prototype.handleMessage = function (message) {
  if (!message.data.type) {
    console.error('Socket message does not have a type');
    return;
  }

  if (this.handlers[message.data.type]) {
    this.handlers[message.data.type](message.data.data);
  }
};

Pipe.prototype.on = function (type, callback) {
  this.handlers[type] = callback;
};

module.exports = Pipe;
