
var manifest = {
  local: {},
  session: {}
};

function DataStore(value) {
  this.value = value;
  this.callbacks = [];
}

DataStore.prototype.addCallback = function (callback) {
  if (_.isFunction(callback)) this.callbacks.push(callback);
};

DataStore.prototype.notifySubscribers = function () {
  for (var i = 0, j = this.callbacks.length; i < j; i++) {
    this.callbacks[i](this.value);
  }
};

function init() {
  for (var localItem in localStorage) {
    if (localStorage.hasOwnProperty(localItem)){
      let val;

      try {
        val = JSON.parse(localStorage[localItem]);
      } catch (e) {
        val = localStorage[localItem];
      }

      manifest.local[localItem] = new DataStore(val);
    }
  }

  for (var sessionItem in sessionStorage) {
    if (sessionStorage.hasOwnProperty(sessionItem)) {
      let val;

      try {
        val = JSON.parse(sessionStorage[sessionItem]);
      } catch (e) {
        val = sessionStorage[sessionItem];
      }

      manifest.session[sessionItem] = new DataStore(val);
    }
  }
}

function updateWebStorage(type, key, value) {
  if (type === 'local' && localStorage) {
    localStorage[key] = JSON.stringify(value);
  }
  if (type === 'session' && sessionStorage) {
    sessionStorage[key] = JSON.stringify(value);
  }
}

function getStorage(type, key, defaultsTo, onUpdate) {
  var val = defaultsTo;

  if (manifest[type]) {
    if (manifest[type][key]) {
      val = manifest[type][key].value;
    } else {
      manifest[type][key] = new DataStore(val);
      updateWebStorage(type, key, val);
    }

    if (!_.isUndefined(onUpdate)) manifest[type][key].addCallback(onUpdate);
  } else {
    console.error('Unsupported storage type. Use \'local\' or \'session\' instead.');
  }

  return val;
}

function setStorage(type, key, value) {
  if (manifest[type]) {
    if (manifest[type][key]) {
      manifest[type][key].value = value;
      manifest[type][key].notifySubscribers();
    } else {
      manifest[type][key] = new DataStore(value);
    }
    updateWebStorage(type, key, value);
  } else {
    console.error('Unsupported storage type. Use \'local\' or \'session\' instead.');
  }
}

if (_.isUndefined(localStorage) || _.isUndefined(sessionStorage)) {
  console.error('You are in incognito mode, some interface settings may not be saved between sessions');
} else {
  init();
}

module.exports = {
  getSession(key, options) {
    return getStorage('session', key, options.defaultsTo, options.onUpdate);
  },
  setSession(key, val) {
    setStorage('session', key, val);
  },
  getLocal(key, options) {
    return getStorage('local', key, options.defaultsTo, options.onUpdate);
  },
  setLocal(key, val) {
    setStorage('local', key, val);
  },
  getManifest(type) { // debugging
    var exported = {
      localStorage: {},
      sessionStorage: {}
    };

    for (var localItem in manifest.local) {
      exported.localStorage[localItem] = manifest.local[localItem];
    }

    for (var sessionItem in manifest.session) {
      exported.sessionStorage[sessionItem] = manifest.session[sessionItem];
    }

    return exported;
  }
};
