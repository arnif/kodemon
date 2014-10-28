var api = require('./controllers/api');

module.exports = function(app) {

  app.route('/api/keys')
    .get(api.getKeys);

  app.route('/api/key/:name')
    .get(api.getKey);
};
