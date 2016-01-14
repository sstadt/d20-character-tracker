var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
    }
  }
}

requirejs.config({
  baseUrl: '/Users/scottstadt/Projects/d20-character-tracker/assets/js',
  deps: tests,
  callback: window.__karma__.start
});