
function generateError(msg) {
  return { err: msg };
}

module.exports = {
  generate: generateError,
  parse: function (error) {
    var message = (_.isString(error)) ? error : error.message || 'There was an error completing your request';

    if (!_.isString(error) && !error.message) {
      console.log('--------------------------------------------');
      console.log('Unknown Error Format:');
      console.log(error);
      console.log('--------------------------------------------');
    }

    return generateError(message);
  }
};
