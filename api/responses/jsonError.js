
module.exports = function(error) {

  return this.res.status(500).json(ErrorService.parse(error));

};
