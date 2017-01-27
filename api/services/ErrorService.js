
function generateError(message, code) {
  if (_.isUndefined(message)) {
    message = 'There was an error completing your request';
  }

  if (_.isUndefined(code)) {
    code = 9999;
  }

  return { code: code, err: message };
}

module.exports = {
  parse: function (error) {
    var errorMessage;

    if (error.message && error.code) {
      errorMessage = generateError(error.message, error.code);
    } else if (_.isString(error)) {
      errorMessage = generateError(error);
    } else {
      errorMessage = generateError();

      console.log('--------------------------------------------');
      console.log('Unknown Error Format:');
      console.log(error);
      console.log('--------------------------------------------');
    }

    return errorMessage;
  }
};
