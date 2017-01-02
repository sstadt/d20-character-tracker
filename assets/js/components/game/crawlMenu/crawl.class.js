
function Crawl(data) {
  this.id = data.id || '';
  this.title = data.title || '';
  this.subtitle = data.subtitle || '';
  this.crawl = data.crawl || '';
  this.imageUrl = data.imageUrl || '';
}

module.exports = Crawl;
