
/**
 * Chat Timestamp
 *
 * Use this filter to add a timestamp to chat messages
 */
Vue.filter('chatTimestamp', function (value) {
  var date = moment(value);
  return date.isValid() ? date.format('MMM Do, YYYY - h:mm A') : 'Invalid Date';
});
