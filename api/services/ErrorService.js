
function generateError(msg) {
  return { err: msg };
}

module.exports = {
  generate: generateError,
  parse: function (error) {
    var message = (error.message) ? error.message : 'There was an error completing your request';

    if (!error.message) {
      console.log('--------------------------------------------');
      console.log('Unknown Error Format:');
      console.log(error);
      console.log('--------------------------------------------');
    }

    return generateError(message);
  }
};
