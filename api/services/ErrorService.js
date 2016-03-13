
module.exports = {
  parse: function (error) {
    var message = (error.message) ? error.message : 'There was an error completing your request';

    if (!error.message) {
      console.log('--------------------------------------------');
      console.log('Unknown Error Format:');
      console.log(error);
      console.log('--------------------------------------------');
    }

    return { err: message };
  }
};
