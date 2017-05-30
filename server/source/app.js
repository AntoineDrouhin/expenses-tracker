const express = require('express')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const mongoose = require('mongoose')
const mongodb_address = process.env.NODE_ENV == 'test' ?
  process.env.MONGODB_ADDRESS_TEST : process.env.MONGODB_ADDRESS

const UserModel = require('./model/user.js')
const UserTokenModel = require('./model/userToken.js')
const issueToken = require('./service/issueToken')

if (!mongodb_address)
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'

// Configuring Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy
require('./config/passport.js')(passport, LocalStrategy)

passport.use(new RememberMeStrategy(
  function(token, done) {

    UserTokenModel.find({token: token}, function (err, userToken) {
      if (err) { return done(err) }
      // if (!uid) { return done(null, false) }

      UserModel.find({_id : userToken.idUser}, (err, user) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        return done(null, user)
      })
    })
  },
  issueToken
))

mongoose.connect(mongodb_address)

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())

// app.post('/login',
//   passport.authenticate('local', {failureRedirect: '/login', failureFlash: true }),
//   function(req, res, next) {
//     // Issue a remember me cookie if the option was checked
//     //if (!req.body.remember_me) { return next(); }
//
//     issueToken(req.user, function(err, token) {
//       if (err) { return next(err) }
//       res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })
//       return next()
//     })
//   },
//   function(req, res) {
//     res.json({_id: req.user.id,
//       email: req.user.email,
//       connected: true,
//       error: false})
//   })

// require('./config/passport.js')(passport, LocalStrategy)

const expressSession = require('express-session')
app.use(expressSession({
  secret: 'mySecretKey',
  cookie: {
    secure: true
  }
}))

/* Fake, in-memory database of users */

// var users = [
//     { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
//   , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
// ]

//
// function findById(id, fn) {
//   var idx = id - 1
//   if (users[idx]) {
//     fn(null, users[idx])
//   } else {
//     fn(new Error('User ' + id + ' does not exist'))
//   }
// }

//
// function findByEmail(email, fn) {
//   console.log('findByEmail', email)
//   for (var i = 0, len = users.length; i < len; i++) {
//     var user = users[i]
//     if (user.email === email) {
//       return fn(null, user)
//     }
//   }
//   return fn(null, null)
//   UserModel.find({email : email}, (err,user) => {
//     if (err) return fn(null, null)
//     return fn(null, user)
//   })
// }



/* Fake, in-memory database of remember me tokens */

// var tokens = {}

// function consumeRememberMeToken(token, fn) {
//   console.log('consumeRememberMeToken', token)
//   var uid = tokens[token]
//   // invalidate the single-use token
//   delete tokens[token]
//   return fn(null, uid)
// }

passport.serializeUser(function(user, done) {
  done(null, user._id)
})

passport.deserializeUser(function(_id, done) {
  UserModel.find({_id: _id}, function (err, user) {
    done(err, user)
  })
})

// passport.use(new LocalStrategy(
//   function(email, password, done) {
//     process.nextTick(function () {
//
//       // Find the user by username.  If there is no user with the given
//       // username, or the password is not correct, set the user to `false` to
//       // indicate failure and set a flash message.  Otherwise, return the
//       // authenticated `user`.
//       console.log('localStrat')
//
//       UserModel.find({email : email}, (err,user) => {
//         if (err) { return done(err) }
//         if (!user) { return done(null, false, { message: 'Unknown user ' + email }) }
//         if (user.password != password) { return done(null, false, { message: 'Invalid password' }) }
//         console.log(email, password)
//         return done(null, user)
//       })
//     })
//   }
// ))

// function issueToken(user, done) {
//   var token = utils.randomString(64)
//   console.log('issueToken', token)
//   saveRememberMeToken(token, user.id, function(err) {
//     if (err) { return done(err) }
//     return done(null, token)
//   })
// }

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.sendStatus(401)
}

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('remember-me'))

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

const login = require('./route/login.js')
app.use('/login', login)

const expense = require('./route/expense.js')
app.use('/expense', ensureAuthenticated, expense)

const user = require('./route/user.js')
app.use('/user', user)

module.exports = app
