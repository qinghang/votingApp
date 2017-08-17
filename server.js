var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

require('dotenv').config();
mongoose.connect(process.env.MONGOLAB_URI, {useMongoClient: true});
app.set('superSecret', process.env.secret);
app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(require('./controllers/route.js'));


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});