var MongoClient = require('mongodb').MongoClient,
  Server = require('mongodb').Server,
  assert = require('assert');

// functions.js/
var bcrypt = require('bcryptjs'),
  Q = require('q');

//used in local-signup strategy
exports.localReg = function(username, password) {
  console.log("Attempting to localReq with: " + username +" " + password)
  var deferred = Q.defer();
  var hash = bcrypt.hashSync(password, 8);
  var user = {
    "username": username,
    "password": hash,
    "avatar": "http://placepuppy.it/images/homepage/Beagle_puppy_6_weeks.JPG"
  }
  console.log("About to start mongo connect")
  MongoClient.connect('mongodb://localhost:27017/sentimentaltweet').then(function (db) {
    console.log("Starting connection");
    db.collection('users').findOne({
      "username": username
    },function(err, doc) {
      console.log("inside of find one")
      if (doc != null) {
        console.log(' username already exists');
        deferred.resolve(false);
        db.close();
      } else if (err != null) {
        deferred.reject(new Err(err));

      } else {
        console.log("FIRST TIME!");

        db.collection('users').insertOne(user, function(err, doc) {
          if (err == null) {
            console.log("successfully inserted user: " + user)
            deferred.resolve(user);
          } else {
            console.error("failed to insert user: " + err);
            deferred.reject(new Error(err));
          }
          db.close();
        });
      }

    });

  });
  console.log("DONE??")
return deferred.promise;
};

//check if user exists
//if user exists check if passwords match (use bcrypt.compareSync(password, hash); // true where 'hash' is password in DB)
//if password matches take into website
//if user doesn't exist or password doesn't match tell them it failed
exports.localAuth = function(username, password) {
  var deferred = Q.defer();
 MongoClient.connect('mongodb://localhost:27017/sentimentaltweet').then(function(db) {
    db.collection('users').findOne({
      "username": username
    }, function(err, doc) {
      if (err != null) {
        console.log("FOUND USER");
        console.log(doc.hash);
        var hash = doc.hash;
        console.log(bcrypt.compareSync(password, hash));
        if (bcrypt.compareSync(password, hash)) {
          deferred.resolve(doc);
        } else {
          console.log("PASSWORDS DO NOT MATCH");
        }
      } else {
        console.error("The requested items could not be found");
        deferred.resolve(false);
      }
      mongoclient.close();

    });
     return deferred.promise;
  });
};
