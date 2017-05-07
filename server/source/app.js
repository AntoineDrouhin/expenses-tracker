const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const mongoose = require('mongoose')
const mongodb_address = process.env.NODE_ENV == 'test' ?
  process.env.MONGODB_ADDRESS_TEST : process.env.MONGODB_ADDRESS



if (!mongodb_address)
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'

mongoose.connect(mongodb_address)

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// Configuring Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy

//require('./config/passport.js')(passport, LocalStrategy)
const expressSession = require('express-session')
app.use(expressSession({
  secret: 'mySecretKey',
  cookie: {
    secure: true
  }
}))



/* Fake, in-memory database of users */

var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

/* Fake, in-memory database of remember me tokens */

var tokens = {}

function consumeRememberMeToken(token, fn) {
  var uid = tokens[token];
  // invalidate the single-use token
  delete tokens[token];
  return fn(null, uid);
}

function saveRememberMeToken(token, uid, fn) {
  tokens[token] = uid;
  return fn();
}

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));

passport.use(new RememberMeStrategy(
  function(token, done) {
    consumeRememberMeToken(token, function(err, uid) {
      if (err) { return done(err); }
      if (!uid) { return done(null, false); }

      findById(uid, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
      });
    });
  },
  issueToken
));

function issueToken(user, done) {
  var token = utils.randomString(64);
  saveRememberMeToken(token, user.id, function(err) {
    if (err) { return done(err); }
    return done(null, token);
  });
}

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('remember-me'));

// redirect HTTP to HTTPS
// app.all('*', function(req, res, next){
//   if (req.secure) {
//     console.log("HTTPS api call")
//     return next();
//   };
//   console.log("HTTP api call")
//   res.redirect('https://'+req.hostname+':'+process.env.HTTPS_PORT+req.url);
// });

app.get('/', (req, res) => {
  res.send('Welcome to expenses-tracker API')
})

const expense = require('./route/expense.js')
app.use('/expense', expense)

//const login = require('./route/login.js')
//app.use('/login', login)

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res, next) {
    // Issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }

    issueToken(req.user, function(err, token) {
      if (err) { return next(err); }
      res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 });
      return next();
    });
  },
  function(req, res) {
    res.json({"connecter":true});
  });

const user = require('./route/user.js')
app.use('/user', user)

module.exports = app
