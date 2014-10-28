var elasticsearch = require('elasticsearch');

var elastic;

module.exports = {
  setClient: function() {
    elastic = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  },
  getClient: function() {
    return elastic;
  }
};
