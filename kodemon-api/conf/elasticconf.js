var elasticsearch = require('elasticsearch');

var elastic;

module.exports = {
  setClient: function() {
    elastic = new elasticsearch.Client({
      host: 'batman.wtf:9200',
      debug: true
    });
  },
  getClient: function() {
    return elastic;
  }
};
