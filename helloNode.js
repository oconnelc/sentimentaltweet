var Twitter = require('twitter'); 

var client = new Twitter( { 
 consumer_key: '1DMg575YNht8Hj3yumddFMyAx',
 consumer_secret: 'omoems2MYsO1GBZ4V7KWrsjJdxqiBmyUHpXr2ZWYhwwvFKif2k',
 access_token_key: '269499555-Z6pUDa0UCcKMNMJiYvppae94MkTyw7PMkKgUVhXc',
 access_token_secret: 'sKtCUU3JriU4RFYjjqalAnfv2kTZVCN86tE8HdQ8HF3eg'
});



var five = require('johnny-five');
var board = new five.Board();

board.on("ready", function() { 

	var led = new five.Led(13);
	client.stream('statuses/filter', {track: 'cat'}, function(stream) {
            stream.on('data', function(tweet) { 
                console.log(tweet.text);
                led.blink(); 
                board.wait(100, function() {
                   led.off();
                });
		});
        });
});
