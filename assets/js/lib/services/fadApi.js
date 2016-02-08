

define([
  'lodash',
  'sails'
], function (_) {
  var data = {};

  function populateModel(model, callback) {
    io.socket.get('/api/' + model, function (collection) {
      if (collection.err) {
        callback(collection);
      } else {
        data[model] = collection;
        callback(null);
      }
    });
  }

  return {
    index: function (model, callback) {
      if (data[model]) {
        callback(data[model]);
      } else {
        populateModel(model, function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, data[model]);
          }
        });
      }
    },
    get: function (model, index, callback) {

      function matchInstanceById(instance) {
        return instance.id === index;
      }

      if (data[model]) {
        callback(null, _.find(data[model], matchInstanceById));
      } else {
        populateModel(model, function (err) {
          if (err) {
            callback(err);
          } else {
            callback(null, _.find(data[model], matchInstanceById));
          }
        });
      }
    }
  };

});

