
module.exports = function(error) {

  return this.res.json(ErrorService.parse(error), 500);

};
