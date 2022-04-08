const express = require("express");

//require client elasticsearch
const client = require("./elasticsearch/client");

require("dotenv").config();
const app = express();

client.ping({
  requestTimeout: 30000,
}, function(error) {
  if (error) {
      console.error('elasticsearch cluster is down!');
  } else {
      console.log('Everything is ok on Elasticsearch');
  }
});


client.ping({
  requestTimeout: 30000,
}, function(err) {
  if (err) {
      console.log({
        message: "Elasticsearch cluster is down!",
        error : err
      });
  } else {
      console.log({
        message: "Elasticsearch cluster is up and running on port 9200",
      });
  }
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

//ROUTES
app.use("/", require("./routes/main"));

module.exports = app;
