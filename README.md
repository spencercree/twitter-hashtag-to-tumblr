#Twitter Hashtag to Tumblr Post
Embed tweets with a certain hashtag as a new post on a Tumblr blog.

##Env
I used dotenv to handle my environmental variables. Here are the ones that need to be addressed:
TWITTER_CONSUMER_KEY = *******

TWITTER_CONSUMER_SECRET = *******
TWITTER_ACCESS_TOKEN_KEY = *******
TWITTER_ACCESS_TOKEN_SECRET = *******
TUMBLR_CONSUMER_KEY = *******
TUMBLR_CONSUMER_SECRET = *******
TUMBLR_ACCESS_TOKEN_KEY = *******
TUMBLR_ACCESS_TOKEN_SECRET = *******
NEW_RELIC_LICENSE_KEY = *******
NEW_RELIC_NO_CONFIG_FILE = *******
NEW_RELIC_APP_NAME = *******

##Heroku note
To keep my dyno running on Heroku, I used the newrelic addon which pings my server to keep it awake.

---

In index.js you'll see the hashtag I am searching for, change that to whatever you'd like. You can also monitor for more than one.