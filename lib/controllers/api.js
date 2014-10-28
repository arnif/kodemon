'use strict';

var mongoose = require('mongoose'),
    Messages = mongoose.model('Msg'),
    elasticsearch = require('elasticsearch'),
    elasticconf = require('../../conf/elasticconf');

exports.getKeys = function(req, res) {

  var client = elasticconf.client();

  	client.indices.getFieldMapping({
        "field" : "kodemon"
	     }, function(a, b, c) {
		       console.log(a);
		       console.log(b);
		       console.log(c);
         });



  return Messages.find(function (err, msgs) {
    if (!err) {
      return res.json(msgs);
    } else {
      return res.send(err);
    }
  });
};
