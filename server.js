var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

require('dotenv').config();
mongoose.connect(process.env.MONGOLAB_URI, {useMongoClient: true});

require('./config/passport')(passport); //pass passport for configuration
//required for passport
app.set('trust proxy', 1) //trust first proxy
app.use(session({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/auth.js')(app, passport);

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(require('./routes/api.js'));


app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});