var elasticsearch = require('elasticsearch');

var elastic;

module.exports = {
  setClient: function() {
    elastic = new elasticsearch.Client({
      host: 'arnif.ninja:9100',
      log: 'trace'
    });
  },
  getClient: function() {
    return elastic;
  }
};
