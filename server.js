var dgram = require("dgram"),
    server = dgram.createSocket("udp4"),
    mongoose   = require('mongoose'),
    Msg = require('./models/messages'),
    elasticsearch = require('elasticsearch'),
    express = require('express'),
    elasticconf = require('./conf/elasticconf');


mongoose.connect('mongodb://arnif.me:28017/kodemon'); // connect to our database

elasticconf.setClient();
var client = elasticconf.getClient();

var app = express();
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

  client.create({
    index: 'kodemon',
    type: 'messages',
    body: {
      execution_time: json.execution_time,
      timestamp: new Date(json.timestamp * 1000),
      token: json.token,
      key: json.key,
    }
  }, function (error, response) {
    if (error) {
      console.log(error);
      return;
    }
    message.save(function(err) {
        if (err) {
          console.log(err);
          return;
        }

        console.log('created');
      });
  });



});

server.on('listening', function(){
  console.log('Kodemon server listening on')
  console.log('hostname: ' + server.address().address);
  console.log('port: ' + server.address().port);

  app.listen(port);
  console.log('API is on port ' + port);

});


server.bind(4000);
exports = module.exports = app;
