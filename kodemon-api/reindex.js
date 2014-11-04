var mongoose   = require('mongoose'),
    Msg = require('./models/messages'),
    elasticconf = require('./conf/elasticconf'),
    q = require('q'),
    winston = require('winston');

var client = elasticconf.setClient(),
    Messages = mongoose.model('Msg');

var mongoSize = 0;

winston.add(winston.transports.File, { filename: 'log-reindex.log' });

mongoose.connect('mongodb://batman.wtf:28017/kodemon');

function startIndexing() {
  var elasticSize = 0;
  winston.info('Starting to re-index');
  Messages.find({}, function(err, response) {
    if (!err) {
      if (response.length <= 0) {
        winston.info('Database empty, but thats okey');
        process.exit(0);
      }
      mongoSize = response.length;
      winston.info('Adding ' + response.length + ' to ElasticSearch');
      for (var i = 0; i < response.length; i++) {

        var body = {
          execution_time: response[i].execution_time,
          timestamp: new Date(response[i].timestamp),
          token: response[i].token,
          key: response[i].key,
        };

        elasticconf.insertIntoElastic(body).then(function(response) {
          if (response.created) {
            elasticSize++;
            if (elasticSize == mongoSize) {
              winston.info('Done re-indexing, enjoy');
              process.exit();
            }
          }
        }).fail(function(reson) {
          winston.log('info', 'Failed to add to ElasticSearch', reson);
        });
      }
    }
  });
}



elasticconf.dropMap().then(function(data) {
  winston.info('map drop successfull');
  winston.info('starting to re-index elastic search. Please wait while I finish');
  elasticconf.createIndex().then(function(res) {
    winston.info('index created');
    if (res.acknowledged) {
      elasticconf.createMap().then(function(resp) {
        if (resp.acknowledged) {
          winston.info('map created');
          startIndexing();
        }
      }).fail(function(reson) {
        winston.log('error', 'failed to create map', reson);
      });
    }
  }).fail(function(reson) {
    winston.log('error', 'failed to create index, are you running ElasticSearch ?', reson);
    process.exit(1);
  });

}).fail(function(reson) {
  winston.log('error','failed to drop map', reson);
});
