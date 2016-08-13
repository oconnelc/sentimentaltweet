var Twitter = require('twitter');
var sentiment = require('sentiment');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('properties.txt');

console.log(properties.get('twitter.keyword'))
var client = new Twitter({
  consumer_key: properties.get('twitter.consumer_key'),
  consumer_secret: properties.get('twitter.consumer_secret'),
  access_token_key: properties.get('twitter.access_token_key'),
  access_token_secret: properties.get('twitter.access_token_secret')
});



var five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() {

  var badLed = new five.Led(12);
  var goodLed = new five.Led(13);
  client.stream('statuses/filter', {
    track: properties.get('twitter.keyword')
  }, function(stream) {
    stream.on('data', function(tweet) {
      console.log(tweet.text);
      var tweetSentiment = sentiment(tweet.text);

      console.dir('sentiment score: ' + tweetSentiment.score);

      if(tweetSentiment.score != 0) {
        var ledToUse = ((tweetSentiment.score < 0) ? badLed : goodLed);
        ledToUse.blink();s
        board.wait(100, function() {
          console.log('TURNING OFF');
          ledToUse.stop().off();
        });
      }
    });
  });
});
