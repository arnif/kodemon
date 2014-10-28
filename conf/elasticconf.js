var elasticsearch = require('elasticsearch');

module.exports = {
  client: function() {
    return new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }
};
