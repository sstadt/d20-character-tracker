
module.exports = {
  template: require('./markdownTemplate.html'),
  props: ['content'],
  computed: {
    markup() {
      return (this.content) ? marked(this.content, { sanitize: true }) : '';
    }
  }
};
