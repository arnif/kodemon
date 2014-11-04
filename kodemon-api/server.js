var dgram = require("dgram"),
    server = dgram.createSocket("udp4"),
    mongoose   = require('mongoose'),
    Msg = require('./models/messages'),
    elasticsearch = require('elasticsearch'),
    express = require('express'),
    elasticconf = require('./conf/elasticconf'),
    cors = require('cors')
    winston = require('winston');


mongoose.connect('mongodb://batman.wtf:28017/kodemon'); // connect to our database

winston.add(winston.transports.File, { filename: 'log-server.log' });

elasticconf.setClient();
var client = elasticconf.getClient();

elasticconf.checkMapping().then(function(response) {
  if (!response.mapExists) {
    winston.error('Map does not exist,' +
    ' are you sure ElasticSearch is running ? I will continue ' +
    ' but content is only added to mongoDB, please run reindex.js to ' +
    ' resolve any issues with ElasticSearch');
  } else {
    winston.info('Map exists, all is good, enjoy');
  }
});

var app = express();
app.use(cors());
require('./lib/routes')(app);

var port = process.env.PORT || 8080;

server.on("message", function(msg, rinfo){
  console.log('got message from client: ' + msg);

  var json = JSON.parse(msg);

  var message = new Msg();

  message.execution_time = json.execution_time;
  message.timestamp = new Date(json.timestamp * 1000);
  message.token = json.token;
  message.key = json.key;

  message.save(function(err) {
      if (err) {
        throw err;
      }
      winston.log('info', 'Done adding to database', json);
    });

  var body = {
    execution_time: json.execution_time,
    timestamp: new Date(json.timestamp * 1000),
    token: json.token,
    key: json.key,
  }

  elasticconf.insertIntoElastic(body).then(function(response) {
    if (response.created) {
      winston.log('info', 'Done adding to ElasticSearch', body);
    }
  }).fail(function(reson) {
    winston.error('info', 'Failed to add to ElasticSearch', reson);
  });

});

server.on('listening', function(){
  winston.info('Kodemon server listening on');
  winston.info('hostname: ' + server.address().address);
  winston.info('port: ' + server.address().port);

  app.listen(port);
  winston.info('API is on port ' + port);
});


server.bind(4000);
exports = module.exports = app;
