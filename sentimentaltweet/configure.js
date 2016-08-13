var MongoClient = require('mongodb').MongoClient, assert = require('assert');

var url ='mongodb://localhost:27017/sentimentaltweet';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected succesfully to server");
  module.exports = {
    "db":
  }
});
