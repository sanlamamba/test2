var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
   hosts: [ 'http://elastic:iH8PiL53Me634F8z1aTU@192.168.1.21:9200']
});

client.ping({
    requestTimeout: 30000,
}, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('Everything is ok');
    }
});



client.indices.create({
    index: 'blog'
}, function(err, resp, status) {
    if (err) {
        console.log(err);
    } else {
        console.log("create", resp);
    }
});


client.index({
    index: 'blog',
    id: '1',
    type: 'posts',
    body: {
        "PostName": "Integrating Elasticsearch Into Your Node.js Application",
        "PostType": "Tutorial",
        "PostBody": "This is the text of our tutorial about using Elasticsearch in your Node.js application.",
    }
}, function(err, resp, status) {
    console.log(resp);
});