kodemon-api
===========
Install mongodb (http://docs.mongodb.org/manual/installation/)

Install ElasticSearch (http://www.elasticsearch.org/guide/en/elasticsearch/guide/current/_installing_elasticsearch.html)

make sure ElasticSearch and mongod are running on localhost.

If you wish to use the kodemon decorator please run

    pip install git+https://github.com/hlysig/kodemon-python

and in your python program add 'from kodemon import kodemon'
then you can use the @kodemon decorator above the function you wish to monitor.

Last but not least clone this repo and run these commands to use the server and API, in addition we've provided a simple view to see the data.

SERVER + API
=========
    cd kodemon-api
    npm install
    node reindex.js
    node server.js

reindex.js takes care of creating the map and getting all the data from your mongodb and puts them in ElasticSearch.

VIEW
=========
    cd kodemon-view
    npm install
    bower install
    grunt serve
