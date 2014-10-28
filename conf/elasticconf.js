var elasticsearch = require('elasticsearch');

var elastic;

module.exports = {
  setClient: function() {
    elastic = new elasticsearch.Client({
      host: 'arnif.ninja:9200',
      log: 'trace'
    });
  },
  getClient: function() {
    return elastic;
  }
};
