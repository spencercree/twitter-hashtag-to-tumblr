//carrythenews
//https://en.wikipedia.org/wiki/All_the_Young_Dudes
var dotenv = require('dotenv').config();
require ('newrelic');
var Twitter = require('twitter');
var express = require('express');
var Tumblr = require('tumblrwks');
var app = express();
var http = require('http');
var request = require('request');
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

// Tumblr access
var tumblr = new Tumblr(
  {
    consumerKey: process.env.TUMBLR_CONSUMER_KEY,
    consumerSecret: process.env.TUMBLR_CONSUMER_SECRET,
    accessToken: process.env.TUMBLR_ACCESS_TOKEN_KEY,
    accessSecret: process.env.TUMBLR_ACCESS_TOKEN_SECRET,
  }, "pokemongofailz.tumblr.com"
  // specify the blog url now or the time you want to use 
);

// Twitter client
var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Tweet stream
client.stream('statuses/filter', {track: '#pokemongofail'}, function(stream) {
  stream.on('data', function(tweet) {

    //id of the tweet that matches the hashtag
    var tweetID = tweet.id_str;
    //screenname of user who tweeted it
    var username = tweet.user.screen_name;
    //url to this tweet
    var url = "https://twitter.com/" + username + "/status/" + tweetID;
    //url that we will be pinging to get the embed code
    var full_url = "http://publish.twitter.com/oembed?url=" + url;

    //get request to the oEmbed api
    request(full_url, function (error, response, body) {
      if (!error && response.statusCode == 200) {

        //parsing the response into a JSON object
        var bodyObject = JSON.parse(body);
        //the html for the embed code
        var tumblrPost = bodyObject.html;
        console.log(bodyObject.html);

        //double checking that I did get an embed code back
        if(bodyObject.html) {
          //posting a text post to my Tumblr blog with the embed code as the message
          tumblr.post('/post', {type: 'text', body: tumblrPost}, function(err, json){
            console.log(json);
          });
        };
      }
      console.log(response.statusCode);
    });

  });

  stream.on('error', function(error) {
    throw error;
  });
});

// Server
server.listen(port, function () {
    console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Socket connection
io.on('connection', function (socket) {
    console.log('socket connection');
});
