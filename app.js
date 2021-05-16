var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');  // For session.
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');

var routes = require('./routes/index');
var users = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

// mongoDB part

const mongoose = require('mongoose');

const Dishes = require('./models/dishes');      //require dishes schema.

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log(`Connected correctly to server.`)
}, (err) => {console.log(err);});

// mongoDB part end.

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Basic Authontication

//app.use(cookieParser('12345-67890-09876-54321'));   // "12345-67890-09876-54321" is a key which can be anything it is needed to restore user signed information.

app.use(session({                           // Set the session here.
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);

function auth(req,res,next) {
    console.log(req.session);

    if(!req.user) {       // If session don't have the user information then we authoticate the user.

            var err = new Error('You are not authenticated');

            res.setHeader('WWW-Authenticate', 'Basic');
            err.status = 403;
            next(err);
    }
    else {
       
            next();
        }
    
}


app.use(auth);

// basic authontication end

app.use(express.static(path.join(__dirname, 'public')));    // there will be your index.html file


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
