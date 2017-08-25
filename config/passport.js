var TwitterStrategy = require('passport-twitter').Strategy;
var User = require('../models/user');
var configAuth = require('./auth');

module.exports = function(passport){

    // passport session setup
    // used to serialize the user for the session
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });
    //used to deserialize the user
    passport.deserializeUser(function(id, done){
        User.findById(id, function(err, user){
            done(err, user);
        });
    });

    // Twitter
    passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
    },
    function(token, tokenSecret, profile, cb){
        process.nextTick(function(){
            User.findOne({'twitter.id': profile.id}, function(err, user){
                if(err) return cb(err);

                if(user){
                    return cb(null, user); //user found, return that user
                }else{
                    // if there is no user, create them
                    var newUser = new User();
                    newUser.twitter.id = profile.id;
                    newUser.twitter.token = token;
                    newUser.twitter.username = profile.username;
                    newUser.twitter.displayName = profile.displayName;

                    newUser.save(function(err){
                        if(err) throw err;
                        return cb(null, newUser);
                    });
                }
            }); // end User
        }); // end process
    })); // end passport.use
}