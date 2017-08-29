var express = require('express');
var crypto = require('crypto');

// ====================================
// Twitter Routes

module.exports = function (app, passport){

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {failureRedirect: ''}),
        function(req, res){
            res.redirect('/profile');
        });
    
    app.get('/profile', function(req, res){
        var user = req.user.twitter.displayName;
        res.redirect('https://fccb-votingapp.herokuapp.com:3000/authuser/'+encrypt(user));
    });
}

function encrypt(str){
  var cipher = crypto.createCipher('aes-256-ctr', "FCCBackendProject#6");
  var crypted = cipher.update(str,'utf8','hex');
  crypted += cipher.final('hex');
  return crypted;
}