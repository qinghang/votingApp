var express = require('express');

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
        res.redirect('http://localhost:3000/authuser/?login='+user);
    });
}