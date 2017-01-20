
var q = require('q'),
  AWS = require('aws-sdk'),
  fs = require('fs'),
  bucket = 'ssdcgametable',
  s3;

// initialize config
AWS.config.loadFromPath('./aws.json');

s3 = new AWS.S3({apiVersion: '2006-03-01'});

module.exports = {

  /**
   * Upload a file to s3
   * @param  {object}   file     The file upload object
   * @param  {string}   bucket   The s3 bucket to store the file in
   * @param  {string}   path     The path the file will be stored in on s3
   * @param  {Function} callback Callback function to execute when finished uploading
   * @return {void}
   */
  upload: function (file, path) {
    var deferred = q.defer();

    // Read in the file, convert it to base64, store to S3
    fs.readFile(file.fd, function (err, data) {
      if (err) {
        deferred.reject(err);
      } else {
        var filename = path + '/' + file.filename,
          url = 'https://' + bucket + '.s3.amazonaws.com/' + filename;

        // push to s3
        s3.upload({
          Bucket: bucket,
          Key: filename,
          Body: data,
          ACL: 'public-read',
          ContentType: file.type
        }, function (err) {
          if (err) {
            deferred.reject(err.message);
          } else {
            fs.unlink(file.fd);
            deferred.resolve(url);
          }
        });
      }

    });

    return deferred.promise;
  },

  remove: function (path) {
    var deferred = q.defer();

    s3.deleteObject({
      Bucket: bucket,
      Key: path
    }, function (err) {
      if (err) {
        deferred.reject(err.message);
      } else {
        deferred.resolve();
      }
    });

    return deferred.promise;
  }
};
