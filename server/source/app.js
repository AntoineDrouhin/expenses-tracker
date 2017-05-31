const express = require('express')
// const cors = require('cors')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const utils = require('./service/utils')

const app = express()

const mongoose = require('mongoose')
const mongodb_address = process.env.NODE_ENV == 'test' ?
  process.env.MONGODB_ADDRESS_TEST : process.env.MONGODB_ADDRESS

const UserModel = require('./model/user.js')
const UserTokenModel = require('./model/userToken.js')
// const issueToken = require('./service/issueToken')

if (!mongodb_address)
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'

// Configuring Passport
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy

require('./config/passport.js')(passport, LocalStrategy)

passport.use(new RememberMeStrategy(
  function(token, done) {
    console.log('REMEMBER ME STRATEGY => PARAMETER TOKEN', token)
    UserTokenModel.findOne({token: token}, function (err, userToken) {
      if (err) { return done(err) }
      if (!userToken) { return done(null, false) }
      console.log('REMEMBER ME STRATEGY => USERTOKEN FOUNDED', userToken)
      UserModel.findOne({_id : userToken.idUser}, (err, user) => {
        console.log('REMEMBER ME STRATEGY => USER FOUNDED', user)
        if (err) { return done(err) }
        if (!user) { return done(null, false) }
        return done(null, user)
      })
    })
  },
  function(user, done) {
    var token =  utils.randomString(64)
    console.log('REMEMBERME 2ND CALLBACK => USER ' + user )
    console.log('REMEMBERME 2ND CALLBACK => TOKEN ' + token )
    UserTokenModel.findOne({idUser: user._id},
      function (err, userToken) {
        console.log('REMEMBER ME STRATEGY 2ND CALLBACK => USERTOKEN ' + userToken)
        if (err) { return done(err) }
        if(!userToken) {
          console.log('NEW USERTOKEN :> token ' + token)
          console.log('NEW USERTOKEN :> user ' + user)
          userToken =  new UserTokenModel({
            token: token,
            idUser: user._id,
          })
        } else {
          userToken.token = token
        }
        console.log('REMEMBER ME STRATEGY 2ND CALLBACK => USERTOKEN ' + userToken)
        userToken.save(function (err) {
          if (err) { return done(err) }
          return done(null, token)
        })
      }
    )
  }
)
  //
  // User.findOne({username: oldUsername}, function (err, user) {
  //   user.username = newUser.username;
  //   user.password = newUser.password;
  //   user.rights = newUser.rights;
  //
  //   user.save(function (err) {
  //       if(err) {
  //           console.error('ERROR!');
  //       }
  //   });
// });
)

app.use(function(req, res, next){
  console.log('OPTIONS DETECTION')
  if (req.method === 'OPTIONS') {
    console.log('!OPTIONS')
    // console.dir(req.header)
    var headers = {}
    // IE8 does not allow domains to be specified, just the *
    headers['Access-Control-Allow-Origin'] = req.headers.origin
    // headers["Access-Control-Allow-Origin"] = "*"
    headers['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS'
    headers['Access-Control-Allow-Credentials'] = true
    headers['Access-Control-Max-Age'] = '86400' // 24 hours
    headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    res.writeHead(200, headers)
    res.end()
  } else {
    console.log('NOT OPTIONS SETTING HEADERS ON THE RUN')
    res.set({
      'Access-Control-Allow-Origin': req.headers.origin,
      'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age' : '86400', // 24 hours
      'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    })
    // res.append('Access-Control-Allow-Origin', req.headers.origin)
    // res.append('Access-Control-Allow-Credentials', 'true')
    // headers['Access-Control-Allow-Origin'] = req.headers.origin
    // headers['Access-Control-Allow-Credentials'] = true

    next()
  }
})

mongoose.connect(mongodb_address)

// app.use(function(req, res, next){
//   res.append('Access-Control-Allow-Credentials', 'true')
//   res.append('Access-Control-Allow-Origin', process.env.SERVER_ADDRESS )
//   next()
// })


// app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())




// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'https://127.0.0.1:3443' )
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   next()
// })

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
app.use('/expense'/*, ensureAuthenticated*/, expense)

const user = require('./route/user.js')
app.use('/user', user)

module.exports = app
