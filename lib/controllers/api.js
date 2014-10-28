'use strict';

var mongoose = require('mongoose'),
    Messages = mongoose.model('Msg'),
    elasticsearch = require('elasticsearch'),
    elasticconf = require('../../conf/elasticconf');

exports.getKeys = function(req, res) {

/*
  var client = elasticconf.getClient();

    //http://arnif.ninja:9200/kodemon{index}/messages{type}/
  	client.search({
        "index": 'kodemon',
        "aggregations": {
          "key_list": {
              "terms": {
                "field": "key"

         }
      }
   }
      },function(err, response) {
          console.log(err);
		       console.log(response);
           if (!err) {
             //return res.json(response);
           }
           //return res.send(err);

         });

         */

  return Messages.aggregate([ { $group: { _id : "$key", total: { $sum: 1}}}], function(err, msg) {
    if (err) {
      return res.send(err);
    } else {
      return res.json(msg);
    }
  });


};



exports.getKey = function(req, res) {
  return Messages.find({'key': req.params.name }, function(err, keys) {
    if (err) {
        return res.send(err);
    }
    return res.json(keys);
  });
};

exports.getKeyAtDate = function(req, res) {
  return Messages.find({ 'key': req.params.name ,'timestamp': {"$gte": new Date(req.params.from), "$lt": new Date(req.params.to)}}, function(err, keys) {
    if (err) {
      return res.send(err);
    }
    return res.json(keys);
  });
};
