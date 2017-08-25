module.exports = {
    'twitterAuth': {
        'consumerKey': process.env.TWITTER_CONSUMER_KEY,
        'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
        'callbackURL': 'http://localhost:3001/auth/twitter/callback'
    }
};