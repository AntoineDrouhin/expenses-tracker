const express = require('express')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const UserModel = require('./model/user.js')

const app = express()

// DataBase Configuration
const mongoose = require('mongoose')
const mongodb_address = process.env.NODE_ENV == 'test' ?
  process.env.MONGODB_ADDRESS_TEST : process.env.MONGODB_ADDRESS

if (!mongodb_address) {
  throw 'ERROR : .env file must specify a MONGODB_ADDRESS field'
}

// Passport Configuration
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const RememberMeStrategy = require('passport-remember-me').Strategy
require('./config/passport_localStrategy.js')(passport, LocalStrategy)
require('./config/passport_rememberMeStrategy.js')(passport, RememberMeStrategy)

// Configure CORS
app.use(function(req, res, next){
  res.set({
    'Access-Control-Allow-Origin': req.headers.origin,
    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Max-Age' : '86400', // 24 hours
    'Access-Control-Allow-Headers' : 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  })
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  }
  else {
    next()
  }
})

mongoose.connect(mongodb_address)

app.use(cookieParser())
app.use(bodyParser.json())

const expressSession = require('express-session')
app.use(expressSession({
  secret: 'mySecretKey',
  cookie: {
    secure: true
  }
}))

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next() }
  res.sendStatus(401)
}

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.authenticate('remember-me'))

app.get('/', (req, res) => {
  res.send('Welcome to expenses-tracker API')
})

app.get('/checkauth', ensureAuthenticated, (req, res) => {
  UserModel.findById(req.session.passport.user, function (err, user) {
    if (err) {
      console.log(err)
      res.sendStatus(500)
    }
    res.send({
      _id: user._id,
      email: user.email,
      connected: true,
      error: false
    })
  })
})

const login = require('./route/login.js')
app.use('/login', login)

const expense = require('./route/expense.js')
app.use('/expense',ensureAuthenticated, expense)

const user = require('./route/user.js')
app.use('/user', user)

module.exports = app
