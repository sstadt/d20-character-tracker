

module.exports = {

  /**
   * getIndexById
   *
   * Get the index of a list item by it's id attribute
   *
   * @param  array   list  The list of items to search
   * @param  string  id    The id of the list item to find
   * @return integer       The index of the item; -1 if not found
   */
  getIndexById(list, id) {
    return _.findIndex(list, function (item) {
      return item.id === id;
    });
  }
};
