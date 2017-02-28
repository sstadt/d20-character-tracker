
var sha1 = require('sha1');
var moment = require('moment');

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
  },


  /**
   * debug
   *
   * Convert an observable to a standard object. Useful for
   * debugging since passing a Vue property to console.log
   * shows the observable functions instead of the values.
   *
   * @param  mixed observable  The observable to parse
   * @return mixed             The observable's current value(s)
   */
  debug(observable) {
    return JSON.parse(JSON.stringify(observable));
  },


  /**
   * getPosition
   *
   * Travels up the dom tree to find out the absolute position
   * of an element relative to the viewport.
   *
   * @param  el     element  The element to find a position for
   * @return object          The position object with keys x and y
   */
  getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
      if (el.tagName == "BODY") {
        // deal with browser quirks with body/window/document and page scroll
        var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        var yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }

    return {
      x: xPos,
      y: yPos
    };
  },

  /**
   * guid
   *
   * Generate a GUID
   *
   * @return string The unique (but not compliant) GUID
   */
  guid() {
    var timestamp = moment.unix(),
      randomNum = Math.random() * (100000 - 1) + 1;

    return sha1(`${timestamp}${randomNum}`);
  }
};
