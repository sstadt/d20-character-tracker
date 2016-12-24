

module.exports = {

  /**
   * getUrlParameter
   *
   * Get the value of a parameter in a URL query string
   *
   * @param  string key   The key of the parameter to return
   * @return string       The value of the parameter
   */
  getUrlParameter(key) {
    var params = window.location.search.substr(1).split('&'), p;

    for (var i = 0; i < params.length; i++) {
      p = params[i].split('=');

    	if (p[0] == key) {
    	  return decodeURIComponent(p[1]);
    	}
    }

    return false;
  }

};
