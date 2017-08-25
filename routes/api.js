var express = require('express');
var router = express.Router();
var Poll = require('../models/poll');
var User = require('../models/user');

// ============================
// Poll API
router.get('/api/getall', function(req, res){
    Poll.find({}, 'pollId pollName', function(err, results){
        if(err) return console.log(err);
        res.json(results);
    })
});

router.post('/api/getpoll', function(req, res){
    Poll.findOne({pollId: req.body.pollId}, function(err, results){
        if(err) return console.log(err);
        res.json(results);
    })
});

router.get('/api/getmypolls', function(req, res){
    Poll.find({creater: 'qinghang'}, 'pollId pollName', function(err, results){
        if(err) return console.log(err);
        res.json(results);
    })
});

router.post('/api/savepoll', function(req, res){
    var newPoll = new Poll(req.body.pollData);
    newPoll.save(function(err){
        if(err) console.error(err);
        res.send('New Poll has been saved!');
    });
});

router.post('/api/updatepoll', function(req, res){
    var updateInfo = req.body.pollData;
    var index = updateInfo.voteIndex;
    var opt = {}
    if(index >= 0){
        var setter = {};
        setter['vote.'+index+'.num'] = updateInfo.num;
        opt = {$set: setter};
    }else{
        opt = {$push: {vote: {opt:updateInfo.voteOpt, num:updateInfo.num}}};
    }

    Poll.update({pollId: updateInfo.pollId}, opt, function(err, results){
        if(err) return console.log(err);
        res.send('Vote has been submitted!');
    });
});

router.post('/api/deletepoll', function(req, res){
    Poll.findOneAndRemove({pollId: req.body.pollId}, function(err){
        if(err) throw err;
        res.send('Poll Removed Sucessfully.');
    })
});

router.post('/api/getUser', function(req, res){
    User.findOne({'twitter.displayName': req.body.user}, function(err, results){
        if(err) return console.log(err);
        res.json(results);
    })
})

module.exports = router;