module.exports = {
    'twitterAuth': {
        'consumerKey': process.env.TWITTER_CONSUMER_KEY,
        'consumerSecret': process.env.TWITTER_CONSUMER_SECRET,
        'callbackURL': 'https://fccb-votingapp.herokuapp.com:3001/auth/twitter/callback'
    }
};