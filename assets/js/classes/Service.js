
var q = require('q');

var defaultOptions = {
  schema: {},
  staticData: null,
  debug: false
};

function debugMsg(output, error = false) {
  if (error === true) {
    console.error('');
    console.error('>>> Service Error >>>');
    console.error(output);
    console.error('');
  } else {
    console.log('');
    console.log('>>> Service Debug >>>');
    console.log(output);
    console.log('');
  }
}

function getCombinedOptions(options) {
  var combinedOptions = {};

  for (var opt in defaultOptions) {
    if (options.hasOwnProperty(opt)) {
      combinedOptions[opt] = options[opt];
    }
  }

  return combinedOptions;
}

function getCombinedParams(staticData, data) {
  if (!_.isUndefined(data)) {
    for (var item in staticData) {
      if (!data.hasOwnProperty(item)) {
        data[item] = staticData[item];
      }
    }

    return data;
  } else {
    return staticData;
  }
}

function getRequest(endpoint, debug) {
  var deferred = q.defer();

  io.socket.get(endpoint, function (response) {
    if (response && response.err) {
      if (debug === true) debugMsg(response, true);
      deferred.reject(response);
    } else {
      if (debug === true) debugMsg(response);
      deferred.resolve(response);
    }
  });

  return deferred.promise;
}

function postRequest(endpoint, data, debug) {
  var deferred = q.defer();

  io.socket.post(endpoint, data, function (response) {
    if (response && response.err) {
      if (debug === true) debugMsg(response, true);
      deferred.reject(response);
    } else {
      if (debug === true) debugMsg(response);
      deferred.resolve(response);
    }
  });

  return deferred.promise;
}

function makeApiCall(endpoint, data, debug = false) {
  if (debug === true) debugMsg(data);
  return _.isUndefined(data) ? getRequest(endpoint, debug) : postRequest(endpoint, data, debug);
}

function Service(options) {
  this._options = getCombinedOptions(options);

  for (var endpoint in this._options.schema) {
    if (this._options.schema.hasOwnProperty(endpoint)) {
      let apiEndpoint = endpoint;
      /* jshint loopfunc:true */
      this[apiEndpoint] = function (data) { // create the api function from the endpoint key
        var params = getCombinedParams(this._options.staticData, data);
        return makeApiCall(this._options.schema[apiEndpoint], params, this._options.debug);
      };
      /* jshint loopfunc:false */
    }
  }
}

module.exports = Service;
