

module.exports = {
  getIndexById(list, id) {
    return _.findIndex(list, function (item) {
      return item.id === id;
    });
  }
};
