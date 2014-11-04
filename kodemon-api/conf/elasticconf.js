var elasticsearch = require('elasticsearch'),
    q = require('q');

var elastic;

var map = {
    message:{
        properties:{
            execution_time   : {"type" : "integer", "index" : "not_analyzed"},
            timestamp        : {"type" : "date", "index" : "not_analyzed"},
            token            : {"type" : "string", "index" : "not_analyzed"},
            key              : {"type" : "string", "index" : "not_analyzed"}
        }
    }
}

module.exports = {
  setClient: function() {
    elastic = new elasticsearch.Client({
      host: 'localhost:9200',
      debug: true
    });
    return elastic;
  },
  getClient: function() {
    return elastic;
  },
  checkMapping: function() {
    if (elastic) {
      var deferred = q.defer();
      elastic.indices.getMapping({
          index: 'kodemon'
      }, function(err, response) {
        if (!err) {
          if (response.kodemon) {
            deferred.resolve({mapExists: true});
          } else {
            deferred.resolve({mapExists: false});
          }
        } else {
            deferred.resolve({mapExists: false});
        }
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  },
  dropMap: function() {
    var deferred = q.defer();
    if (elastic) {
      elastic.indices.delete({
        index: 'kodemon'
      },
      function(err, response) {
        if (err) {
          deferred.resolve(err);
        }
        deferred.resolve(response);
      });
    }
    return deferred.promise;
  },
  createMap: function() {
    var deferred = q.defer();
    if (elastic) {
      elastic.indices.putMapping({index:"kodemon", type:"message", body:map},
       function(err, response) {
         if (err) {
           deferred.reject(err);
         } else {
           deferred.resolve(response);
         }
      });
    } else {
      deferred.reject(elastic);
    }
    return deferred.promise;
  },
  createIndex: function() {
    var deferred = q.defer();
    if (elastic) {
      elastic.indices.create({
        index: 'kodemon'
      },
        function(err, response) {
          if (err) {
            deferred.reject(err);
          } else {
            deferred.resolve(response);
          }
      });
    } else {
      deferred.reject();
    }
    return deferred.promise;
  },
  insertIntoElastic: function(obj) {
    var deferred = q.defer();

    elastic.create({
      index: 'kodemon',
      type: 'message',
      body: obj
    }, function (error, response) {
      if (error) {
        deferred.reject(error);
      } else {
        deferred.resolve(response);
      }
    });

    return deferred.promise;
  }
};
