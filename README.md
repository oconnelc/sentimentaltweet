This application connects to twitter and subscribes to a feed based on the keyword
in the properties.txt file. When the tweent comes in, the text is passed into
a sentiment analysis and a score is returned. If the score is positve, an LED
light on the arduino will light up. If it's negative another LED will light up.

To use: create a file called properties.file
and add the following contents:

[twitter]

consumer_key = <consumer key from twitter API>,
consumer_secret = <consumer key from twitter API>,
access_token_key = <access token key from twitter API>,
access_token_secret = <access token key from twitter API>
keyword = <Keyword to search>
