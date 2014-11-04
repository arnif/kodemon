'use strict';

var mongoose = require('mongoose'),
    Messages = mongoose.model('Msg'),
    elasticsearch = require('elasticsearch'),
    elasticconf = require('../../conf/elasticconf');

var client = elasticconf.getClient();

exports.getKeys = function(req, res) {

    //http://arnif.ninja:9200/kodemon{index}/messages{type}/
    client.search({
      index: 'kodemon',
      size: 0,
      body: {
        aggregations: {
          key_list: {
            terms: {
              field: 'key'
            }
          }
        }
      }
    },function(err, response) {
      if (err) {
        //{ $group: { _id : '$key', doc_count: { $sum: 1}}}
        return Messages.aggregate([
            { $group: { _id : '$key', doc_count: { $sum: 1}}}
          ], function(err, msg) {
          if (err) {
            return res.send(err);
          } else {
            return res.json(msg);
          }
        });
      }
      return res.json(response.aggregations.key_list.buckets);
    });
};


exports.getKey = function(req, res) {
  var size = req.query.size ? req.query.size : 100,
      from = req.query.from ? req.query.from : 0;

  client.search({
    index: 'kodemon',
    from: from,
    size: size,
    body: {
      query: {
        query_string: {
          query: req.params.name
        }
      }
    }
  }).then(function (resp) {
    var hits = resp.hits.hits;
    var skil = [];
    for (var i = 0; i < hits.length; i++) {
      skil.push(hits[i]._source);
    }
    return res.send(skil);
  }, function (err1) {
    return Messages.find({'key': req.params.name }, function(err, keys) {
      if (err) {
          return res.send(err);
      }
      return res.json(keys);
    });
  });
};

exports.getKeyAtDate = function(req, res) {

  client.search({
    index: 'kodemon',
    type: 'message',
    body: {
      query : {
        filtered : {
          query: {
            query_string: {
              query : req.params.name
            }
          },
          filter: {
            range : {
              timestamp: {
                gte: new Date(req.params.from),
                lt: new Date(req.params.to)
              }
            }
          }
        }
      }
    }
  }, function(err, response) {
    if (err) {
      return Messages.find({ 'key': req.params.name ,'timestamp': {"$gte": new Date(req.params.from), "$lt": new Date(req.params.to)}}, function(err, keys) {
        if (err) {
          return res.send(err);
        }
        return res.json(keys);
      });
    }

    var hits = response.hits.hits;
    var skil = [];
    for (var i = 0; i < hits.length; i++) {
      skil.push(hits[i]._source);
    }
    return res.send(skil);
  });
};
