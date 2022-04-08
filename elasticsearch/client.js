var elasticsearch = require("elasticsearch");
require("dotenv").config();



var client = new elasticsearch.Client({
  hosts: [ 'http://elastic:ndncFkEcrCtXUOxpxXh4@192.168.1.40:9200']
});



module.exports = client;