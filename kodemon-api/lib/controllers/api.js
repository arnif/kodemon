'use strict';

var mongoose = require('mongoose'),
    Messages = mongoose.model('Msg'),
    elasticsearch = require('elasticsearch'),
    elasticconf = require('../../conf/elasticconf'),
    winston = require('winston');

var client = elasticconf.getClient();
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'log-api.log' })
    ]
  });

exports.getKeys = function(req, res) {

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
            logger.log('error', 'Failed to get from MongoDB ', err);
            return res.send(err);
          } else {
            logger.info('Sending from MongoDB', msg);
            return res.json(msg);
          }
        });
      }
      logger.info('Sending from ElasticSearch ', response.aggregations.key_list.buckets);
      return res.json(response.aggregations.key_list.buckets);
    });
};


exports.getKey = function(req, res) {
  var size = req.query.size ? req.query.size : 100,
      from = req.query.from > 0 ? req.query.from : 0;

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
    logger.info('Sending from ElasticSearch', skil);
    return res.send(skil);
  }, function (err1) {
    return Messages.find({'key': req.params.name }, function(err, keys) {
      if (err) {
        logger.log('error', 'Failed to get from MongoDB', err);
          return res.send(err);
      }
      logger.info('Sending from MongoDB', keys);
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
          logger.log('error', 'Failed to send from MongoDB', err);
          return res.send(err);
        }
        logger.info('Sending from MongoDB', keys);
        return res.json(keys);
      });
    }

    var hits = response.hits.hits;
    var skil = [];
    for (var i = 0; i < hits.length; i++) {
      skil.push(hits[i]._source);
    }
    logger.info('Sending from ElasticSearch', skil);
    return res.send(skil);
  });
};
